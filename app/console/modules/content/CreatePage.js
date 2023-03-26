const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreatePage extends ConsoleController{

    async get(id = null, page = null, errors = new Validation.ValidatorErrors()){

        let pagesRes = await this.db.collection('pages')
            .sort('name')
            .get();

        if(!page){
            page = await this.db.collection('pages').find(id, {
                id : '',
                active : 0,
                is_default_page : 0,
                name : '',
                group : '',
                template_id : ''
            });
        }

        let pageGroupsRes = await this.db.collection('page_groups')
            .get();

        let templatesRes = await this.db.collection('templates')
            .where('page_id', 'eq', page.id)
            .sort('name')
            .get();

        return await this.view.render('content/create_page',{
            pages : pagesRes,
            page : page,
            pageGroups : pageGroupsRes,
            templates : templatesRes,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let page = {
            id : post.get('id'),
            url : post.get('url'),
            active : post.getInt('active'),
            name : post.get('name'),
            group : post.get('group'),
            template_id : post.get('template_id')
        }; 

        validator.add('name', page, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(100, 'Name must not exceed @length characters')
        ]);

        let pagesRes = await this.db.collection('pages')
            .where('url', 'eq', page.url)
            .get();

        if(!pagesRes.empty()){
            if(pagesRes.first().id != page.id){
                validator.addError('name', 'Duplicate page name');
            }
        }

        if(validator.isValid()){

            if(page.group.trim()){

                let pageGroupsRes = await this.db.collection('page_groups')
                    .where('name', 'eq', page.group.trim())
                    .get();

                if(pageGroupsRes.empty()){
                    await this.db.collection('page_groups').create({
                        name : page.group.trim()
                    });
                }
            }

            let result;

            if(post.id){
                result = await this.db.collection('pages').update(post.id, page); 
            }else{

                page.is_default_page = false;

                result = await this.db.collection('pages').create(page); 
            }

            this.request.flash({
                message : `Page ${page.name} saved.`,
                success : result.success
            });
        }

        return await this.get(post.id, page, validator.errors());
    }

    async put(){
        let post = this.request.post();

        let id = post.get('id');
        let state = post.getInt('state');

        if(id){
            let pagesRes = await this.db.collection('pages')
                .where('id', 'eq', id)
                .get();

            if(!pagesRes.empty()){

                let page = pagesRes.first();
                page.is_default_page = state == 1 ? 0 : 1;

                let result = await this.db.collection('pages').update(page.id, page); 

                return {
                    success : result.success
                }
            }
        }

        return {
            success : false
        }
    }

    async delete(){
        let post = this.request.post();

        if(post.id){
            let result = await this.db.collection('pages').delete(post.id);

            return result;
        }

        return {
            success : false
        }
    }
}

module.exports = CreatePage;