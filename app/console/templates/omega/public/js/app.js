class AppBase{

    constructor(){
        this.mount();
    }

    mount(){}

    render(host, templateId, data = {}, callback = {}){

        let template = document.getElementById(templateId);
        let clone = template.content.cloneNode(true);

        if(callback.loaded){
            callback.loaded(clone);
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

        let hostElement = document.getElementById(host);
        hostElement.appendChild(clone);

        if(callback.mounted){
            callback.mounted(hostElement, clone);
        }
    }

    click(selector, fn){
        this._event('click', selector, fn);
    }

    change(selector, fn){
        this._event('change', selector, fn);
    }

    keyup(selector, fn){
        this._event('keyup', selector, fn);
    }

    ondrop(selector, fn){
        this._event('drop', selector, fn);
    }

    ondragover(selector, fn){
        this._event('dragover', selector, fn);
    }

    _event(eventType, selector, fn){
        if(selector.substring(0,1) == '#'){ 
            let e = document.querySelector(selector);
            if(e){
                e.addEventListener(eventType, function(ev) { fn(e, ev); });
            }
        }else{
            let nl = document.querySelectorAll(selector);
            for(let e of nl){
                e.addEventListener(eventType, function(ev) { fn(e, ev); });
            }
        }
    }
}