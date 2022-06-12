const ConsoleController = req('app.console.lib.ConsoleController');

class Attributes extends ConsoleController{

    async get(id = null){

        let attributes = await this.db.collection('attributes').get();

        return await this.view.render('catalog/attributes',{
            attribute : { id : '' },
            attributes : attributes
        });
    }

}

module.exports = Attributes;