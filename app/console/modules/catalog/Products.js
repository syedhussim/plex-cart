const ConsoleController = req('app.console.lib.ConsoleController');

class Products extends ConsoleController{

    async get(pid = null){

        let products = await this.db.collection('products').get();

        return await this.view.render('catalog/products',{
            product : { id : '' },
            products : products,
        });
    }

}

module.exports = Products;