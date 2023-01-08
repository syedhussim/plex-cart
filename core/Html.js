class Html{

    static textbox(name, value){
        return new Textbox(name, value, 'text');
    }

    static date(name, value){
        return new Textbox(name, value, 'date');
    }

    static textarea(name, value){
        return new Textbox(name, value, 'textarea');
    }

    static hidden(name, value){
        return new Textbox(name, value, 'hidden');
    }

    static select(name, value = null){
        return new Select(name, value);
    }
}

class Textbox{

    constructor(name, value, type){
        this._name = name;
        this._id = name;
        this._type = type;
        this._classname = '';

        if(value instanceof Object){
            value = value[name] != null ? value[name] : '';
        }

        if(typeof value != 'undefined'){
            if(value.length == 0 || typeof value == 'undefined'){
                value = '';
            }
        }else{
            value = '';
        }

        this._value = value;
    }

    id(id){
        this._id = id;
        return this;
    }

    css(className){
        this._classname = className;
        return this;
    }

    toString(){
        if(this._type == 'textarea'){
            return `<textarea name="${this._name}" id="${this._id}" class="${this._classname}">${this._value}</textarea>`;
        }else{
            return `<input type="${this._type}" name="${this._name}" id="${this._id}" value="${this._value}" class="${this._classname}" />`;
        }
    }
}

class Select{

    constructor(name, value){
        this._name = name;
        this._id = name;

        if(value instanceof Object){
            value = value[name] != null ? value[name] : '';
        }

        this._selectedValue = value;
        this._options = [];
    }

    id(id){
        this._id = id;
        return this;
    }

    option(value, text){
        this._options.push({ value, text });
        return this;
    }

    fromArray(array = [], useIndex = false){
        for(let idx in array){

            let item = array[idx];
            let value = item;
            
            if(useIndex){
                value = idx;
            }

            this._options.push({ value : value, text : item });
        }
        return this;
    }

    fromArrayObject(array, valueProperty, textProperty){
        
        for(let item of array){

            let text;

            if(textProperty instanceof Function){
                text = textProperty(item);
            }else{
                text = item[textProperty];
            }

            this._options.push({ value : item[valueProperty], text : text });
        }
        return this;
    }

    toString(){
        let output = `<select name="${this._name}" id="${this._id}">`;

        for(let option of this._options){
            output += `<option value="${option.value}" ${this._selectedValue == option.value ? 'selected' : ''}>${option.text}</option>`;
        }

        output += `</select>`;
        return output;
    }
}

module.exports = Html;