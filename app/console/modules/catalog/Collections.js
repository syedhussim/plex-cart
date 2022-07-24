const ConsoleController = req('app.console.lib.ConsoleController');

class Collections extends ConsoleController{

    async get(){

        let collectionsRes = await this.db.collection('collections').get();

        return await this.view.render('catalog/collections',{
            collection : { id : '' },
            collections : collectionsRes,
        });
    }

}

module.exports = Collections;