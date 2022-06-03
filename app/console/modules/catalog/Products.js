const ConsoleController = req('app.console.lib.ConsoleController');

class Products extends ConsoleController{

    async get(){

        let products = await this.db.collection('products').get();

        return await this.view.render('catalog/products',{
            products : products
        });
    }

}

module.exports = Products;