const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateProduct extends ConsoleController{

    async get(pid = null, product = null, errors = new Validation.ValidatorErrors()){

        if(!product){
            product = await this.db.collection('products').find(pid, {
                name : '',
                description : '',
                price : 0,
                visibility : 1,
                sku : '',
                barcode : '',
                quantity : 0,
                track_quantity : 0,
                attributes : {}
            });
        }

        let attributes = await this.db.collection('attributes')
            .sort('name')
            .get();

        let attrArray = [];

        for(let attribute of attributes){

            attribute = Object.assign({}, attribute);

            if(product.attributes[attribute.property]){
                attribute.product_value = product.attributes[attribute.property].value;
            }else{
                attribute.product_value = '';
            }

            if(attribute.type == 'ATTR_MENU'){
                attribute.menu_items = attribute.menu_items.split("\n").map(v => { return v.trim() });
            }

            attrArray.push(attribute);
        }

        return await this.view.render('catalog/create_product',{
            product : product,
            attributes :  attrArray,
            errors : errors
        });
    }
 
    async post(pid){

        let post = this.request.post();

        let properties = Object.keys(post);
        let productAttributes = {};

        let validator = new Validation.Validator();

        for(let property of properties){
            if(property.substring(0,5) == 'attr_'){
                let productAttribute = property.substring(5);

                let attributeResult = await this.db.collection('attributes')
                    .where('property', 'eq', productAttribute)
                    .get();

                if(!attributeResult.empty()){
                    let attribute = attributeResult.first();

                    productAttributes[productAttribute] = { name : attribute.name, value : post[property].trim() };

                    if(attribute.required){
                        validator.add(property, productAttributes[productAttribute].value, [
                            new Validation.Required(`${attribute.name} is required`)
                        ]);
                    }
                }
            }
        }

        let product = {
            url : Util.url(post.name, 'product'),
            name : post.name,
            description : post.description,
            price : parseFloat(post.price),
            visibility : parseInt(post.visibility),
            sku : post.sku,
            barcode : post.barcode,
            quantity : parseInt(post.quantity),
            track_quantity : parseInt(post.track_quantity),
            attributes : productAttributes
        };   

        validator.add('name', product, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(100, 'Name must not exceed @length characters')
        ]).add('sku', product, [
            new Validation.Required('SKU is required'),
            new Validation.MaxLength(40, 'SKU must not exceed @length characters')
        ]).add('price', product, [
            new Validation.Required('Price is required'),
            new Validation.Number('Price is not a number'),
        ]);

        if(validator.isValid()){

            let result;

            if(pid){
                result = await this.db.collection('products').update(pid, product);
            }else{
                result = await this.db.collection('products').create(product);
            }
        }

        return await this.get(pid, product, validator.errors());
    }
}

module.exports = CreateProduct;