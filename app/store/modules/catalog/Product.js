const StoreController = req('app.store.lib.controllers.StoreController');

class Product extends StoreController{

    async get(){
        
        let productsRes = await this.db.collection('products')
            .where('url', 'eq', this.request.url().pathname())
            .get();

        if(!productsRes.empty()){

            if(this.models.has('product')){ 

                let model = req(this.models.get('product'));
                let product = new model(productsRes.first());

                return this.view.render('catalog/product', {
                    product : product
                });
            }
        }
    }
}

module.exports = Product; 