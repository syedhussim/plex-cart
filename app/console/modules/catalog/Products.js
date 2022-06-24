const ConsoleController = req('app.console.lib.ConsoleController');

class Products extends ConsoleController{

    async get(search = null){

        let productsRef = this.db.collection('products');

        if(search){
            productsRef.where('name', 'eq', search)
        }

        productsRef.limit(20,0);

        let products = await productsRef.get();

        return await this.view.render('catalog/products',{
            product : { id : '' },
            products : products,
        });
    }

}

module.exports = Products;