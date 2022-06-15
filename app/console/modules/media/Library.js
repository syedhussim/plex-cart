const ConsoleController = req('app.console.lib.ConsoleController');

class Library extends ConsoleController{

    async get(search = null){

        let productsRef = this.db.collection('products');

        if(search){
            productsRef.where('name', 'eq', search)
        }

        let products = await productsRef.get();

        return await this.view.render('media/library',{
            product : { id : '' },
            products : products,
        });
    }

}

module.exports = Library;