const ConsoleController = req('app.console.lib.ConsoleController');

class CssBase extends ConsoleController{

    async get(){
        let output = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');\n\n";
        
        output += '* { box-sizing: border-box; }\n\n';

        let size = 4;

        for(let i=1; i < 7; i++){
            output += 'h' + i + ' { margin : 0px; font-size : ' + (((size - 1) / 5) + 1) + 'rem; font-weight : 400; text-transform : uppercase }\n'; 
            size--;
        }

        output += "\n";

        for(let i=1; i < 5; i++){
            output += '.bg-' + i + ' { background-color : var(--background-color-' + i + '); }\n'; 
        }

        output += "\n";

        for(let i=1; i < 11; i++){
            output += '.br-' + i + '-px { border-radius : ' + i + 'px; }\n'; 
        }

        output += "\n";
        
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
            for(let i=1; i < 11; i++){
                output += '.'+ this.clasName(cls) + '-' + (i* 10) + '-px { ' + cls + ' : ' + (i * 10) + "px; }\n";
            }
            output += "\n";
        }

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
            for(let i=0; i < 21; i++){
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

        for(let i=1; i < 5; i++){
            output += '.fc-' + i + ' { color : var(--font-color-' + i + '); }\n';
        }
        output += "\n";
        

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
            output += '.fx-jc-'+ this.clasName(cls)  + ' { justify-content : ' + cls + "; }\n";
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


        props = [
            'auto', 'content', 'fit-content', 'max-content', 'min-content', 
        ];

        for(let cls of props){ 
            output += '.fx-fx-'+ this.clasName(cls)  + ' { flex : ' + cls + "; }\n";
        }

        output += "\n";


        props = [
            'border-top', 'border-right', 'border-bottom', 'border-left', 
        ];

        for(let cls of props){ 
            output += '.' + this.clasName(cls)  + '-cr-1-1px { ' + cls + ' : 1px solid var(--border-color-1); }\n';
        }

        output += "\n";

        for(let cls of props){ 
            output += '.' + this.clasName(cls)  + '-cr-1-2px { ' + cls + ' : 2px solid var(--border-color-1); }\n';
        }

        output += "\n";

        for(let cls of props){ 
            output += '.' + this.clasName(cls)  + '-cr-2-1px { ' + cls + ' : 1px solid var(--border-color-2); }\n';
        }

        output += "\n";

        for(let cls of props){ 
            output += '.' + this.clasName(cls)  + '-cr-2-2px { ' + cls + ' : 2px solid var(--border-color-2); }\n';
        }

        output += "\n";

        this.response.contentType('text/css');
        
        return output;
 
    }

    clasName(string){
        if(string.indexOf('-') <0){
            return string.substring(0,1) + string.substring(string.length -1);
        }
        return string.split('-').map((v,i) => {
            let len = 1;
            if((string.substring(0,3) == 'max' || string.substring(0,3) == 'min') && i==0){
                len = 3;
            }
            return v.substring(0,len);
        }).join('');
    }

}

module.exports = CssBase;