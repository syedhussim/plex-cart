const StoreController = req('app.store.lib.controllers.StoreController');

class Product extends StoreController{

    async get(){
        
        let productsRes = await this.db.collection('products')
            .where('url', 'eq', this.request.url().pathname())
            .where('active', 'eq', 1)
            .get();

        if(!productsRes.empty()){

            if(this.models.has('product')){ 

                let attributesRes = await this.db.collection('attributes')
                    .where('active', 'eq', 1)
                    .where('visibility', 'gt', 0)
                    .get();

                let model = req(this.models.get('product'));
                let product = new model(productsRes.first(), attributesRes);

                return this.view.render('catalog/product', {
                    product : product
                });
            }
        }
    }
}

module.exports = Product; 