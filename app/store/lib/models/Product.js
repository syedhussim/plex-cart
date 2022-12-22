class Product{

    constructor(data, attributes){
        Object.assign(this, data);

        for(let attribute of attributes){
            if(this.attributes.hasOwnProperty(attribute.property)){
                this.attributes[attribute.property].property = attribute.property;
            }
        }
    }
}

module.exports = Product;