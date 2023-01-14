const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class RelatedPages extends ConsoleController{

    async get(id = null, linkedPage = null, errors = new Validation.ValidatorErrors()){

        let templatesRes = await this.db.collection('templates')
            .where('id', 'eq', id)
            .get();

        if(!templatesRes.empty()){

            let template = templatesRes.first();

            let pagesRes = await this.db.collection('pages')
                .where('id', 'eq', template.page_id)
                .get();

            if(!pagesRes.empty()){

                let page = pagesRes.first();

                pagesRes = await this.db.collection('pages')
                    .sort('name')
                    .get();

                if(!linkedPage){
                    linkedPage = await this.db.collection('linked_pages').find(id, {
                        id : '',
                        template_id : '',
                        filters : {}
                    });
                }
        
                let attributesRes = await this.db.collection('attributes')
                    .where('active', 'eq', 1)
                    .sort('name')
                    .get();
        
                for(let attribute of attributesRes){
                    if(attribute.type == 'ATTR_MENU'){ 
                        attribute.menu_items = attribute.menu_items.split("\n").map(v => { return v.trim() });
                    }
        
                    if(linkedPage.filters.hasOwnProperty(attribute.property)){
                        attribute.op = linkedPage.filters[attribute.property].op;
                        attribute.value = linkedPage.filters[attribute.property].value;
                    }
                }
        
                return await this.view.render('content/related_pages',{
                    pages : pagesRes,
                    page : page,
                    template : template,
                    attributes : attributesRes,
                    errors : errors
                });
            }
        }
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
}

module.exports = RelatedPages;