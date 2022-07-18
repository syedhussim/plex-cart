class Product{

    constructor(data){
        this._id = data.id;
        this._name = data.name;
        this._url = data.url;
        this._description = data.description;
        this._price = data.price;
        this._attributes = data.attributes;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get url(){
        return this._url;
    }

    get description(){
        return this._description;
    }

    get price(){
        return this._price;
    }

    attributes(property = null){
        if(property){
            if(this._attributes.hasOwnProperty(property)){
                return this._attributes[property];
            }
            return '';
        }

        return this._attributes;
    }
}

module.exports = Product;