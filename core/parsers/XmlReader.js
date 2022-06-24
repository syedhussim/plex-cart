class XmlReader{
    static *parse(str){

        let len = str.length;
        let token = '';
        let captureTag = false;

        for(let i=0; i < len; i++){
            let ch = str[i];
            
            if(ch == '<'){
                if(token.trim()){
                    yield {
                        type : 'TEXT',
                        value : token
                    }
                }
                captureTag = true;
                token = '';
                continue;
            }

            if(ch == '>' && captureTag){
                let tagType = token.substring(0,1) == '/' ? 'CLOSE_TAG' : 'OPEN_TAG'

                yield {
                    type : tagType,
                    value : token
                }
                
                token = '';
                captureTag = false;
                continue;
            }

            token += ch;
        }
    }
}

module.exports = XmlReader;