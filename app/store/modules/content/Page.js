const StoreController = req('app.store.lib.controllers.StoreController');

class Page extends StoreController{

    async get(){
        
        let pagesRes = await this.db.collection('pages')
            .where('url', 'eq', this.request.url().pathname())
            .where('active', 'eq', 1)
            .get();

        if(!pagesRes.empty()){

            let page = pagesRes.first();

            let templatesRes = await this.db.collection('templates')
                .where('id', 'eq', pagesRes.first().template_id)
                .get();

            if(!templatesRes.empty()){

                let template = templatesRes.first();
                let model = req(this.models.get('page'));

                let pageModel = new model({
                    name : page.name,
                    template_file : template.template_file,
                    params : template.variables
                });

                await pageModel.init(this.db);

                let file = pageModel.template_file.substring(0, pageModel.template_file.indexOf('.'));

                return this.view.render(`content/${file}`, { page_name : pageModel.name, ...pageModel.params });
            }
        }
    }
}

module.exports = Page; 