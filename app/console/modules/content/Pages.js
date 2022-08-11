const ConsoleController = req('app.console.lib.ConsoleController');

class Pages extends ConsoleController{

    async get(){

        let pagesRes = await this.db.collection('pages')
            .sort('name')
            .get();

        return await this.view.render('content/pages',{
            page : { id : '' },
            pages : pagesRes,
        });
    }

}

module.exports = Pages;