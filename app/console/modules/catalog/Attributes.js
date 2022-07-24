const ConsoleController = req('app.console.lib.ConsoleController');

class Attributes extends ConsoleController{

    async get(){

        let attributes = await this.db.collection('attributes').get();

        let visibility = [
            'Internal',
            'Product',
            'Product - Collection',
            'Product - Collection - Basket'
        ];

        return await this.view.render('catalog/attributes',{
            attribute : { id : '' },
            attributes : attributes,
            visibility : visibility
        });
    }

}

module.exports = Attributes;