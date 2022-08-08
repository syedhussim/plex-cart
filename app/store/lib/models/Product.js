class Product{

    constructor(data, attributes){
        Object.assign(this, data);

        let tmpAttributes = [];

        for(let attribute of attributes){
            if(this.attributes.hasOwnProperty(attribute.property)){
                this.attributes[attribute.property].property = attribute.property;
                tmpAttributes.push(this.attributes[attribute.property]);
            }
        }

        this.attributes = tmpAttributes;
    }
}

module.exports = Product;