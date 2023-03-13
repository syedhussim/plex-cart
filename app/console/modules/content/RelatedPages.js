const ConsoleController = req('app.console.lib.ConsoleController');

class RelatedPages extends ConsoleController{

    async get(pid){

        let pagesRes = await this.db.collection('pages')
            .where('id', 'eq', pid)
            .get();

        if(!pagesRes.empty()){

            let page = pagesRes.first();

            pagesRes = await this.db.collection('pages')
                .sort('name')
                .get();

            let relatedPagesRes = await this.db.collection('related_pages')
                .where('parent_page_id', 'eq', page.id)
                .sort('name')
                .get();

            pagesRes = pagesRes.join(relatedPagesRes, 'id', 'page_id', ['page_id']);

            return await this.view.render('content/related_pages',{
                page : page,
                pages : pagesRes
            });
        }
    }

    async post(){

        let post = this.request.post();
        
        let pageId = post.get('pid');

        let pageRes = await this.db.collection('pages')
            .where('id', 'eq', pageId)
            .get();

        if(!pageRes.empty()){

            let page = pageRes.first();

            await this.db.collection('related_pages').delete({ property : 'parent_page_id', value : page.id });

            for(let pageId of post.getArray('page_id')){
                await this.db.collection('related_pages').create({ 
                    parent_page_id : page.id,
                    page_id : pageId
                });
            }
            
            this.response.redirect(`/content/pages/create?pid=${page.id}`);
            return;
        }
    }
}

module.exports = RelatedPages;