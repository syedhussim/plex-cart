const ConsoleController = req('app.console.lib.ConsoleController');

class Products extends ConsoleController{

    async get(pid = null){

        let products = await this.db.collection('products').get();

        let selectedProduct = await this.db.collection('products').find(pid, {
            id : ''
        });
        
        return await this.view.render('catalog/products',{
            products : products,
            selectedProduct : selectedProduct
        });
    }

}

module.exports = Products;