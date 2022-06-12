const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateProduct extends ConsoleController{

    async get(pid = null, product = null, errors = new Validation.ValidatorErrors()){ 

        let products = await this.db.collection('products').get();

        if(!product){
            product = await this.db.collection('products').find(pid, {
                id : '',
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

            if(['ATTR_MENU', 'ATTR_MULTI_MENU'].includes(attribute.type)){
                attribute.menu_items = attribute.menu_items.split("\n").map(v => { return v.trim() });
            }

            attrArray.push(attribute);
        }

        return await this.view.render('catalog/create_product',{
            products : products,
            product : product,
            attributes :  attrArray,
            errors : errors
        });
    }
 
    async post(){

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
            id : post.id,
            url : Util.url(post.name, 'product', post.sku),
            name : post.name,
            description : post.description,
            price : Util.tryParseFloat(post.price),
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
            new Validation.IsDecimal('Price is not valid'),
        ]);

        let productsRef = await this.db.collection('products')
            .where('url', 'eq', product.url)
            .get();

        if(!productsRef.empty()){
            let data = productsRef.first();

            if(data.id != product.id){
                validator.addError('name', 'Duplicate product name');
            }
        }

        if(validator.isValid()){

            let result;
            let action = '';

            if(post.id){
                result = await this.db.collection('products').update(post.id, product);
                action = 'Updated';
            }else{
                result = await this.db.collection('products').create(product);
                action = 'Created';
            }

            this.request.flash({
                message : `${action} product ${product.name}`,
                success : result ? true : false,
                error : 'Operation failed'
            });

            return await this.get(post.id, product);
        }

        return await this.get(post.id, product, validator.errors());
    }

    async delete(){
        let post = this.request.post();

        if(post.pid){
            let result = await this.db.collection('products').delete(post.pid);
            console.log(result);
        }
    }
}

module.exports = CreateProduct;