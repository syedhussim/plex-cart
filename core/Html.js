class Html{

    static textbox(name, value){
        return new Textbox(name, value);
    }

    static select(name, value = null){
        return new Select(name, value);
    }
}

class Textbox{

    constructor(name, value){
        this._name = name;

        if(value instanceof Object){
            value = value[name] != null ? value[name] : '';
        }

        this._value = value;
    }

    toString(){
        return `<input type="text" name="${this._name}" id="${this._name}" value="${this._value}" />`;
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