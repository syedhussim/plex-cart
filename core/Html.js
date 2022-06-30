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

    static select(name, value = null){
        return new Select(name, value);
    }
}

class Textbox{

    constructor(name, value, type){
        this._name = name;
        this._type = type;
        this._classname = '';

        if(value instanceof Object){
            value = value[name] != null ? value[name] : '';
        }

        this._value = value;
    }

    css(className){
        this._classname = className;
        return this;
    }

    toString(){
        if(this._type == 'textarea'){
            return `<textarea name="${this._name}" id="${this._name}" class="${this._classname}">${this._value}</textarea>`;
        }else{
            return `<input type="${this._type}" name="${this._name}" id="${this._name}" value="${this._value}" class="${this._classname}" />`;
        }
    }
}

class Select{

    constructor(name, value){
        this._name = name;

        if(value instanceof Object){
            value = value[name] != null ? value[name] : '';
        }

        this._selectedValue = value;
        this._options = [];
    }

    option(value, text){
        this._options.push({ value, text });
        return this;
    }

    fromArray(array = []){
        for(let item of array){
            this._options.push({ value : item, text : item });
        }
        return this;
    }

    fromArrayObject(array, key, value){
        for(let item of array){
            this._options.push({ value : item[key], text : item[value] });
        }
        return this;
    }

    toString(){
        let output = `<select name="${this._name}" id="${this._name}">`;

        for(let option of this._options){
            output += `<option value="${option.value}" ${this._selectedValue == option.value ? 'selected' : ''}>${option.text}</option>`;
        }

        output += `</select>`;
        return output;
    }
}

module.exports = Html;