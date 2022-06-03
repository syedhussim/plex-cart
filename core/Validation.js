class Validator{
    constructor(){
        this.fields = [];
        this._errors = {};
    }

    add(name, value, validators = []){

        if(typeof value === 'object'){
            value = value[name];
        }

        this.fields.push({
            name : name,
            value : value,
            validators : validators
        });
        return this;
    }

    addError(name, message){
        this._errors[name] = message;
        return this;
    }

    isValid(){
        for(let i=0; i < this.fields.length; i++){
            let field = this.fields[i];

            for(let j=0; j < field.validators.length; j++){
                let validator = field.validators[j];
                validator.value = field.value || '';

                if(!validator.validate()){
                    this._errors[field.name] = validator.message;
                    break;
                }
            }
        }
        if(this._errors.length == 0){
            return true;
        }
        return false;
    }

    errors(){
        return new ValidatorErrors(this._errors);
    }
}

class ValidatorErrors{

    constructor(errors = {}){
        Object.assign(this, errors);
    }

    get(name){
        if(this[name]){
            return this[name];
        }
        return '';
    }
}

class Required{
    constructor(message){
        this.message = message;
        this.value = '';
    }

    validate(){
        if(this.value.trim().length == 0){
            return false;
        }
        return true;
    }
}

class MaxLength{
    constructor(length, message){
        this.length = length;
        this.message = message.replace(/@length/g, length);
        this.value = '';
    }

    validate(){
        if(this.value.trim().length > this.length){
            return false;
        }
        return true;
    }
}

class Length{
    constructor(length, message){
        this.length = length;
        this.message = message;
        this.value = '';
    }

    validate(){
        if(this.value.length != this.length){
            return false;
        }
        return true;
    }
}

class Number{
    constructor(message){
        this.message = message;
        this.value = '';
    }

    validate(){
        if(isNaN(this.value)){
            return false;
        }
        return true;
    }
}

module.exports = {
    Validator : Validator,
    ValidatorErrors : ValidatorErrors,
    Required : Required,
    MaxLength : MaxLength,
    Length : Length,
    Number : Number
};