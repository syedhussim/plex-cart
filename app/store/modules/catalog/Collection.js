const StoreController = req('app.store.lib.controllers.StoreController');

class Collection extends StoreController{

    async get(){
        
        let collectionsRes = await this.db.collection('collections')
            .where('url', 'eq', this.request.url().pathname())
            .get();


        if(this.models.has('product')){ 

            let collection = collectionsRes.first();

            let filters = collection.filters || {};

            let productsQuery = this.db.collection('products');

            for(let [property, data] of Object.entries(filters)){
                productsQuery.where(`attributes.${property}.value`, data.op, data.value);
            }

            let productsRes = await productsQuery.get();

            let products = [];

            for(let product of productsRes){
                let model = req(this.models.get('product'));
                products.push(new model(product));
            }

            return this.view.render('catalog/collection', {
                products : products
            });
        }
        
    }
}

module.exports = Collection; 