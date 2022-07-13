const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateProduct extends ConsoleController{

    async get(pid = null, product = null, errors = new Validation.ValidatorErrors()){ 

        let products = await this.db.collection('products').limit(20,0).get();

        if(!product){
            product = await this.db.collection('products').find(pid, {
                id : '',
                name : '',
                description : '',
                price : 0,
                taxable : 0,
                visibility : 1,
                sku : '',
                barcode : '',
                quantity : 0,
                track_quantity : 0,
                images : [],
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
            id : post.get('id'),
            url : Util.url(post.get('name'), 'product', post.get('sku')),
            name : post.get('name'),
            description : post.get('description'),
            price : post.getFloat('price'),
            taxable : post.getInt('taxable'),
            visibility : post.getInt('visibility'),
            sku : post.get('sku'),
            barcode : post.get('name'),
            quantity : post.getInt('quantity'),
            track_quantity : post.getInt('track_quantity'),
            images : [],
            attributes : productAttributes
        };

        let productImagesRes = await this.db.collection('media')
            .where('id', 'in', post.getArray('images'))
            .get();
        
        for(let image of productImagesRes){
            product.images.push({
                id : image.id,
                name : image.name,
                img : '/' + image.name,
                image_size : image.image_size.join(' x ')
            });
        }

        validator.add('name', product, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(100, 'Name must not exceed @length characters')
        ]).add('sku', product, [
            new Validation.Required('SKU is required'),
            new Validation.MaxLength(40, 'SKU must not exceed @length characters')
        ]).add('price', product, [
            new Validation.IsFloat('Price is not valid'),
        ]).add('quantity', product, [
            new Validation.IsNumber('Quantity is not valid'),
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

            if(post.id){
                result = await this.db.collection('products').update(product.id, product);
            }else{
                result = await this.db.collection('products').create(product);
            }

            this.request.flash({
                message : `Product details for ${product.name} have been updated`,
                success : result.success,
            });

            return await this.get(post.id, product);
        }

        return await this.get(post.id, product, validator.errors());
    }

    async delete(){
        let post = this.request.post();

        if(post.get('product_id')){
            let result = await this.db.collection('products').delete(post.get('product_id'));

            return {
                success : result
            }
        }

        return {
            success : false
        }
    }
}

module.exports = CreateProduct;