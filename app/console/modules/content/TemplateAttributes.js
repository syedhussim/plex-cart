const ConsoleController = req('app.console.lib.ConsoleController');

class TemplateAttributes extends ConsoleController{

    async get(pid, id){

        let pageRes = await this.db.collection('pages')
            .where('id', 'eq', pid)
            .get();

        if(!pageRes.empty()){

            let templatesRes = await this.db.collection('templates')
                .where('id', 'eq', id)
                .get();

            if(!templatesRes.empty()){

                let page = pageRes.first();
                let template = templatesRes.first();

                let pagesRes = await this.db.collection('pages')
                    .sort('name', 'ASC')
                    .get();

                let attributesRes = await this.db.collection('attributes')
                    .where('active', 'eq', 1)
                    .sort('name')
                    .get();

                let templateAttributeRes = await this.db.collection('template_attributes')
                    .where('page_id', 'eq', page.id)
                    .where('template_id', 'eq', template.id)
                    .get();

                attributesRes = attributesRes.join(templateAttributeRes, 'id', 'attribute_id', ['template_id']);

                return await this.view.render('content/template_attributes',{
                    page : page,
                    template : template,
                    pages : pagesRes,
                    attributes : attributesRes,
                });
            }
        }
    }

    async post(){

        let post = this.request.post();
        
        let pageId = post.get('pid');
        let templateId = post.get('id');

        let pageRes = await this.db.collection('pages')
            .where('id', 'eq', pageId)
            .get();

        if(!pageRes.empty()){

            let templatesRes = await this.db.collection('templates')
                .where('id', 'eq', templateId)
                .get();

            if(!templatesRes.empty()){

                await this.db.collection('template_attributes').delete({ property : 'template_id', value : templateId });

                for(let attributeId of post.getArray('attribute_id')){
                    let result = await this.db.collection('template_attributes').create({ 
                        page_id : pageId,
                        template_id : templateId,
                        attribute_id : attributeId
                    });
                }
                
                this.response.redirect(`/content/templates/create?pid=${pageId}&id=${templateId}`);
                return;
            }
        }
    }
}

module.exports = TemplateAttributes;