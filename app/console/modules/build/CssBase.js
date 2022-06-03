const ConsoleController = req('app.console.lib.ConsoleController');

class CssBase extends ConsoleController{

    async get(){
        let output = '';
        let props = [
            'width', 
        ];

        for(let cls of props){
            for(let i=1; i < 11; i++){
output += '.'+ this.clasName(cls) + '-' + (i* 10) + '-pc { ' + cls + ' : ' + (i * 10) + "%; }\n";
            }
            output += "\n";
        }

        props = [
            'width', 'min-width', 'max-width', 
        ];

        for(let cls of props){
            for(let i=1; i < 15; i++){
output += '.'+ this.clasName(cls) + '-' + (i* 100) + '-px { ' + cls + ' : ' + (i * 100) + "px; }\n";
            }
            output += "\n";
        }


        props = [
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left' ,
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'
        ];

        for(let cls of props){
            for(let i=0; i < 11; i++){
output += '.'+ this.clasName(cls) + '-' + (i* 5) + ' { ' + cls + ' : ' + (i * 5) + "px; }\n";
            }
            output += "\n";
        }

        props = [
            'font-size', 
        ];

        for(let cls of props){
            for(let i=10; i < 36; i += 2){
output += '.'+ this.clasName(cls) + '-' + (i+ 2) + ' { ' + cls + ' : ' + (i + 2) + "px; }\n";
            }
            output += "\n";
        }

        props = [
            'font-weight', 
        ];

        for(let cls of props){
            for(let i=3; i < 7; i++){
output += '.'+ this.clasName(cls) + '-' + (i*100) + ' { ' + cls + ' : ' + (i * 100) + "; }\n";
            }
            output += "\n";
        }

        props = [
            'flex', 'block', 'inline', 'inline-block', 
        ];

        for(let cls of props){ 
output += '.dy-'+ this.clasName(cls)  + ' { display : ' + cls + "; }\n";
        }

        output += "\n";

        props = [
            'flex-start', 'flex-end', 'center', 'space-around', 'space-between', 'space-evenly', 'initial', 
        ];

        for(let cls of props){ 
output += '.fx-jc-'+ this.clasName(cls)  + ' { justify-center : ' + cls + "; }\n";
        }

        output += "\n";

        props = [
            'flex-start', 'flex-end', 'center', 'stretch', 'base-line', 'initial', 
        ];

        for(let cls of props){ 
output += '.fx-ai-'+ this.clasName(cls)  + ' { align-items : ' + cls + "; }\n";
        }

        output += "\n";

        props = [
            'row', 'row-reverse', 'column', 'column-reverse', 'initial', 
        ];

        for(let cls of props){ 
output += '.fx-fd-'+ this.clasName(cls)  + ' { flex-direction : ' + cls + "; }\n";
        }

        output += "\n";

return output;
 
    }

    clasName(string){
        if(string.indexOf('-') <0){
            return string.substring(0,1) + string.substring(string.length -1);
        }
        return string.split('-').map(v => {
            return v.substring(0,1);
        }).join('');
    }

}

module.exports = CssBase;