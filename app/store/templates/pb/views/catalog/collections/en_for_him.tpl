{{ await include('shared/en_header') }}

{% foreach product in products %}
    <h2>{{ product.name }}</h2>
    <p>{{ product.attributes.en_description.value }}</p>
{% /foreach %}



    <style>
    html, body { height : 100% }
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
        .editor { position: relative; display: flex; border:1px solid #000; height: 100%; font-family: 'Varela Round', sans-serif;}
        .back { font-family: 'Varela Round', sans-serif; font-weight: 400; background-color: #0e111a; position:absolute;
            top :0px; right:0px; left:0px; bottom:0px; padding: 10px; font-size: 16px;
            color: #dde1d5; margin:0px;
            overflow: hidden auto;
            line-height: 20px;
            z-index: -1;
        }
        .txt {
            color: transparent;
            font-family: 'Varela Round', sans-serif;
            font-weight: 400;
            background-color: transparent;
            border:0px;
            padding:10px;
            font-size: 16px;
            outline: none;
            caret-color:#FFF;
            overflow: hidden auto;
            width:100%;
            height: 100%;
            margin:0px;
            line-height: 20px;
        }
        .txt:focus{
            border:0px;
        }

        .color-1{
            color:#00c3ff;
        }
        .color-2{
            color:#b170a6;
        }
        .color-3{
            color:#fff;
        }
        .color-4{
            color:#ff06e4;
        }
        .color-5{
            color:#e8a62e;
        }
    </style>

    <div class="editor">
        <pre id="back" class="back"></pre>
        <textarea class="txt" id="txt" oninput="test(this)"  contenteditable="true" spellcheck="false"></textarea>
    </div>

    <script type="text/javascript">

    function scroll(sender){
        console.log(sender);
    }

    function test(sender){

        let input = sender.value;

        let len = input.length;
            let tokens = [];
            let token = '';
            let quote = false;

            for(let i=0; i < len; i++){
                let ch = input[i];

                if(ch == '"'){
                    quote = quote ? false : true;
                }

                if([' ', '.', "\\n", '(', ')', ","].includes(ch) && quote == false){
                    tokens.push(token);
                    tokens.push(ch);
                    token = '';
                    continue;
                }

                token += ch;
            }

            tokens.push(token)

            let output = '';

            for(let token of tokens){
                switch(token.toLowerCase().trim()){
                    case 'select':
                    case 'from':
                    case 'where':
                    case 'on':
                    case 'group':
                    case 'order':
                    case 'by':
                    case 'limit':
                    case 'and':
                    case 'or':
                    case 'inner':
                    case 'left':
                    case 'join':
                    case 'as':
                    case 'int':
                        output += '<span class="color-1">' + token + '</span>';
                        break;
                    case 'cast':
                    case 'ifnull':
                    case 'count':
                    case 'sum':
                        output += '<span class="color-4">' + token + '</span>';
                        break;
                    default:
                        if(token.substring(0,1) == '"'){
                            output += '<span class="color-5">' + token + '</span>';
                        }else{
                            output += '<span>' + token + '</span>';
                        }
                }
            }

            back.innerHTML = output;
            back.scrollTop = sender.scrollTop;
    }

    document.getElementById('txt').addEventListener('scroll', function(e){
        back.scrollTop = this.scrollTop;
    });

    let back = document.getElementById('back');
    </script>
