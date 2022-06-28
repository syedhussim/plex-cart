class AppBase{

    constructor(){
        this.mount();
    }

    mount(){}

    render(host, templateId, data = {}, callback = null){

        let template = document.getElementById(templateId);
        let clone = template.content.cloneNode(true);

        if(callback){
            callback(clone);
        }

        let nodeList = clone.querySelectorAll('*');

        for(let node of nodeList){
            let attributes = node.attributes;
            
            for(let attribute of attributes){

                if(data.hasOwnProperty(attribute.nodeValue)){
                    switch(attribute.nodeName){
                        case 'data-src':
                            node.src = data[attribute.nodeValue];
                            break;
                        case 'data-name':
                            node.innerHTML = data[attribute.nodeValue];
                            break;
                        case 'id':
                            node.setAttribute('id', data[attribute.nodeValue]);
                            break;
                        case 'value':
                            node.value = data[attribute.nodeValue];
                            break;
                        default:
                            if(attribute.nodeName.substring(0,5) == 'data-'){
                                attribute.nodeValue = data[attribute.nodeValue];
                            }
                        
                    }
                }
            }
        }

        document.getElementById(host).appendChild(clone);
    }

    click(selector, fn){
        let e = document.querySelector(selector);
        e.addEventListener('click', function () { fn(e); });
    }
}