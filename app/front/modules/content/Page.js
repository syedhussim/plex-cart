const Frontontroller = req('app.front.lib.controllers.Frontontroller');
const PageContent = req('app.front.lib.content.PageContent');

class Page extends Frontontroller{

    async get(){
        
        let pagesRes = await this.db.collection('pages')
            .where('url', 'eq', this.request.url().pathname())
            .where('active', 'eq', 1)
            .get();

        if(!pagesRes.empty()){

            let page = pagesRes.first();

            let templatesRes = await this.db.collection('templates')
                .where('id', 'eq', page.template_id)
                .get();

            if(!templatesRes.empty()){

                let template = templatesRes.first(); 

                let file = template.template_file.substring(0, template.template_file.indexOf('.'));

                return this.view.render(`content/${file}`, { 
                    page : new PageContent(template.attributes)
                });
            }
        }
    }
}

module.exports = Page; 