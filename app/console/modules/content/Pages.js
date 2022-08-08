const ConsoleController = req('app.console.lib.ConsoleController');

class Pages extends ConsoleController{

    async get(search = null){

        let pagesRes = this.db.collection('pages');

        if(search){
            pagesRes.where('name', 'eq', search)
        }

        pagesRes.limit(20,0);
        pagesRes.sort('created_time', 'DESC');

        let pages = await pagesRes.get();

        return await this.view.render('content/pages',{
            page : { id : '' },
            pages : pages,
        });
    }

}

module.exports = Pages;