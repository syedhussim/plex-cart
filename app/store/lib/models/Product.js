class Product{

    constructor(data){
        Object.assign(this, data);
    }

    attributes(property = null){
        if(property){
            if(this.attributes.hasOwnProperty(property)){
                return this.attributes[property];
            }
            return '';
        }

        return this.attributes;
    }
}

module.exports = Product;