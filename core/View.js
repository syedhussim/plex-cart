const fs = require('fs/promises');

class View{

    constructor(dir){
        this._viewDir = dir
        this.params = {};
    }

    async render(files, params = {}){

        if(typeof files == 'string'){
            files = [ files ];
        }

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

    async _parse(string, params = {}){

        let len = string.length;
        let token = '';
        let tokens = [];
        let codeBlock = false;
        let codeType = '';

        for(let i=0; i < len; i++){
            let ch =  string[i];
            let nc = string[i + 1] || false;

            if((ch == '$' || ch == '@') && nc == '{'){
                codeType = (ch == '$') ? 'VARIABLE' : 'CODE';
                tokens.push({
                    type : 'STRING',
                    value : token
                });

                token = '';
                codeBlock = true;
                i++;
                continue;
            }

            if(ch == '}' && codeBlock){
                tokens.push({
                    type : codeType,
                    value : token
                });

                token = '';
                codeBlock = false;
                continue;
            }

            token += ch;
        }

        tokens.push({
            type : 'STRING',
            value : token
        });

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
                    output += this._processCode(token.value);
                    break;
            }
        }

        output += ' return out;';

        params = {...this.params, ...params };
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

    _processCode(blockToken){
        let tokens = blockToken.split(' ');

        switch(tokens[0]){
            case 'if':  
                return 'if (' + tokens.splice(1).join(' ') + '){';
            case 'elseif':  
                return '}else if (' + tokens.splice(1).join(' ') + '){';
            case 'else': 
                return '}else{';
            case 'for': 
                return 'for (' + tokens.splice(1).join(' ') + '){';
            case 'foreach': 

                let item = tokens[1];

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
            case '/for': 
            case '/foreach': 
                return '}';
            default:
                return blockToken;
        }
    }
}

module.exports = View;