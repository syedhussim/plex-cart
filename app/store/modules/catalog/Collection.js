const StoreController = req('app.store.lib.controllers.StoreController');

class Collection extends StoreController{

    async get(){
        
        let collectionsRes = await this.db.collection('collections')
            .where('url', 'eq', this.request.url().pathname())
            .get();


        if(this.models.has('product')){ 

            let attributesRes = await this.db.collection('attributes')
                .where('active', 'eq', 1)
                .where('visibility', 'gt', 0)
                .get();

            let collection = collectionsRes.first();

            let templatesRes = await this.db.collection('templates')
                .where('id', 'eq', collection.template_id)
                .get();

            if(!templatesRes.empty()){

                let template = templatesRes.first();
                let model = req(this.models.get('collection'));

                let collectionModel = new model({
                    name : collection.name,
                    template_file : template.template_file,
                    params : template.variables
                });

                await collectionModel.init(this.db);

                let file = collectionModel.template_file.substring(0, collectionModel.template_file.indexOf('.'));

                let filters = collection.filters || {};

                let productsQuery = this.db.collection('products');

                for(let [property, data] of Object.entries(filters)){
                    productsQuery.where(`attributes.${property}.value`, data.op, data.value);
                }

                let productsRes = await productsQuery.get();

                let products = [];

                for(let product of productsRes){
                    let model = req(this.models.get('product'));
                    products.push(new model(product, attributesRes));
                }

                return this.view.render(`catalog/collections/${file}`, {
                    page_name : collectionModel.name, 
                    products : products,
                    ...collectionModel
                });
            }
        }
    }
}

module.exports = Collection; 