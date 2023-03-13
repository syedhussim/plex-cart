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

                let relatedPagesRes = await this.db.collection('related_pages')
                    .where('parent_page_id', 'eq', page.id)
                    .get();

                let relatedPages = [];
                
                if(!relatedPagesRes.empty()){
                    pagesRes = await this.db.collection('pages')
                        .where('id', 'in', relatedPagesRes.select('page_id'))
                        .get();
                    
                    for(let page of pagesRes){
                        let templatesRes = await this.db.collection('templates')
                            .where('id', 'eq', page.template_id)
                            .get();

                        if(!templatesRes.empty()){
                            let template = templatesRes.first();
                            relatedPages.push(new PageContent(template.attributes));
                        }
                    }
                }

                return this.view.render(`content/${file}`, { 
                    page : new PageContent(template.attributes, relatedPages)
                });
            }
        }
    }
}

module.exports = Page; 