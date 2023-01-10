const fs = require('fs/promises');
const { exit } = require('process');

class View{

    constructor(dir){
        this._viewDir = dir
        this._params = {};
        this._prependFiles = [];
        this._appendFiles = [];
        this._ifStatementCount = 0;
    }

    prependFile(file){
        this._prependFiles.push(file);
    }

    appendFile(file){
        this._appendFiles.push(file);
    }

    param(name, value){
        this._params[name] = value;
    }

    async render(files, params = {}){

        if(typeof files == 'string'){
            files = [ files ];
        }

        files = this._prependFiles.concat(files);

        files = files.concat(this._appendFiles);

        let data = [];

        for(let file of files){ 
            let buffer = await fs.readFile(this._viewDir.concat(file).concat('.tpl'));
            data.push(buffer.toString('UTF8'));
        }

        return await this._parse(data.join("\n"), params);
    }

    async renderString(string, params = {}){
        return await this._parse(string, params);
    }

    async _parse(str, params = {}){

        let lines = str.split("\n");

        let token = '';
        let tokens = [];
        let codeBlock = false;
        let codeType = '';
        let lineNum = 1;

        for (let line of lines){

            let len = line.length;

            for(let i=0; i < len; i++){
                let ch = line[i];
                let nc = line[i + 1] || false;

                if((ch == '{' && nc == '%') || (ch == '{' && nc == '{')){
                    codeType = (ch == '{' && nc == '{') ? 'VARIABLE' : 'CODE';
                    tokens.push({
                        type : 'STRING',
                        value : token,
                        lineNum : lineNum
                    });

                    token = '';
                    codeBlock = true;
                    i++;
                    continue;
                }

                if((ch == '%' && nc == '}') || (ch == '}' && nc == '}') && codeBlock){
                    tokens.push({
                        type : codeType,
                        value : token,
                        lineNum : lineNum
                    });

                    token = '';
                    codeBlock = false;
                    i++;
                    continue;
                }

                token += ch;
            }

            tokens.push({
                type : 'STRING',
                value : token,
                lineNum : lineNum
            }); 

            token = '';
            lineNum++;
        }

        let output = "let out = '';";

        for(let token of tokens){
            switch(token.type){
                case 'STRING':
                    output += "out +=`" + token.value + "`;"
                    break;
                case 'VARIABLE':
                    output += "out +=" + token.value + ";"
                    break;
                case 'CODE': 
                    output += this._processCode(token);
                    break;
            }
        }

        output += ' return out;';

        params = {...this._params, ...params };

        params['include'] = async(file) =>{
            let view = new View(this._viewDir);
            return await view.render(file, params);
        };

        let keys = [];
        let vals = []; 

        for(let key of Object.keys(params)){
            keys.push(key);
            vals.push(params[key]);
        }

        let asyncConstructor = Object.getPrototypeOf(async function(){}).constructor;

        let func = new asyncConstructor(...keys, output);

        return await func(...vals);
        
    }

    _processCode(token){
        let blockToken = token.value;
        let tokens = blockToken.trim().split(' ');

        switch(tokens[0]){
            case 'if':  
                if(tokens.length == 1){
                    throw new ViewSyntaxError(`On line ${token.lineNum} -> ${token.value.trim()} statement not closed`);
                }
                this._ifStatementCount++;
                return 'if (' + tokens.splice(1).join(' ') + '){';
            case 'elseif':
                return '}else if (' + tokens.splice(1).join(' ') + '){';
            case 'else': 
                if(this._ifStatementCount == 0){
                    throw new ViewSyntaxError(`On line ${token.lineNum} -> ${token.value.trim()} statement without opening if block`);
                }
                return '}else{';
            case 'for': 
                return 'for (' + tokens.splice(1).join(' ') + '){';
            case 'foreach': 
                let item = tokens[1];

                if(tokens.length == 1){
                    throw new ViewSyntaxError(`On line ${token.lineNum} -> ${token.value.trim()} statement not closed`);
                }

                if(item.indexOf(':') > -1){
                    let segments = tokens[1].split(':');
                    let key = segments[0];
                    item = segments[1];
                    return 'for (let [' + key + ',' + item + '] of ' + tokens[tokens.length-1] + '){';
                } 

                let capture = false;
                let array = [];

                for(let item of tokens){
                    if(item == 'in'){
                        capture = true;
                        continue;
                    }

                    if(capture){
                        array.push(item);
                    }
                }
                return 'for (let ' + item + ' of ' + array.join('') + '){';

            case '/if': 
                if(this._ifStatementCount == 0){
                    throw new ViewSyntaxError(`On line ${token.lineNum} -> ${token.value.trim()} statement without opening if block`);
                }
                this._ifStatementCount--;
                return '}'
            case '/for': 
            case '/foreach': 
                return '}';
            default:
                return blockToken;
        }
    }
}

class ViewSyntaxError extends Error{
    constructor(message, file){
        super(message);
        this.stack = '';
    }
}

module.exports = View;