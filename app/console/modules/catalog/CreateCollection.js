const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateCollection extends ConsoleController{

    async get(id = null, collection = null, errors = new Validation.ValidatorErrors()){

        if(!collection){
            collection = await this.db.collection('collections').find(id, {
                id : '',
                active : 0,
                name : '',
                template_id : '',
                filters : {}
            });
        }

        let collectionsRes = await this.db.collection('collections').get();

        let attributesRes = await this.db.collection('attributes')
            .where('active', 'eq', 1)
            .sort('name')
            .get();

        for(let attribute of attributesRes){
            if(attribute.type == 'ATTR_MENU'){ 
                attribute.menu_items = attribute.menu_items.split("\n").map(v => { return v.trim() });
            }

            if(collection.filters.hasOwnProperty(attribute.property)){
                attribute.op = collection.filters[attribute.property].op;
                attribute.value = collection.filters[attribute.property].value;
            }
        }

        let templatesRes = await this.db.collection('templates')
            .where('collection_id', 'eq', collection.id)
            .sort('name')
            .get();

        return await this.view.render('catalog/create_collection',{
            collections : collectionsRes,
            attributes : attributesRes,
            collection : collection,
            templates : templatesRes,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let properties = post.getArray('property');
        let ops = post.getArray('op');
        let propertyValues = post.getArray('property_value');

        let collection = {
            id : post.get('id'),
            active : post.getInt('active'),
            name : post.get('name'),
            url : Util.url(post.get('name'), 'collection'),
            template_id : post.get('template_id'),
            filters : {}
        };

        validator.add('name', collection, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]);

        let collectionsRes = await this.db.collection('collections')
            .where('url', 'eq', collection.url)
            .get();

        if(!collectionsRes.empty()){
            let data = collectionsRes.first();

            if(data.id != collection.id){
                validator.addError('name', 'Duplicate collection name');
            }
        }

        let attributesRes = await this.db.collection('attributes')
            .sort('name')
            .get();

        let attrProperties = attributesRes.select('property');

        for(let i=0; i < properties.length; i++){
            let property = properties[i];

            if(!attrProperties.includes(property)){
                validator.addError('attribute_error', `Attribute ${property} does not exist`);
            }

            let op = ops[i];
            let propertyValue = propertyValues[i];

            if(propertyValue){
                collection.filters[property] = {
                    op : op,
                    value : propertyValue
                };
            }
        }

        if(validator.isValid()){

            let result;

            if(post.id){
                result = await this.db.collection('collections').update(post.id, collection);
            }else{
                result = await this.db.collection('collections').create(collection);
            }

            this.request.flash({
                message : `Collection ${collection.name}`,
                success : result.success
            });

            return await this.get(post.id, collection);
        }

        return await this.get(post.id, collection, validator.errors());
    }

    async delete(){
        let post = this.request.post();

        if(post.id){
            let result = await this.db.collection('collections').delete(post.id);

            return result;
        }

        return {
            success : false
        }
    }
}

module.exports = CreateCollection;