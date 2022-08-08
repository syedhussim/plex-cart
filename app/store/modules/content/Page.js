const StoreController = req('app.store.lib.controllers.StoreController');

class Page extends StoreController{

    async get(){
        
        let pagesRes = await this.db.collection('pages')
            .where('url', 'eq', this.request.url().pathname())
            .where('active', 'eq', 1)
            .get();

        if(!pagesRes.empty()){

            let page = pagesRes.first();

            return this.view.render('content/page', {
                page : page
            });
            
        }
    }
}

module.exports = Page; 