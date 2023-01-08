const Util = req('core.Util');
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
                name : '',
                template_id : ''
            });
        }

        let templatesRes = await this.db.collection('templates')
            .where('page_id', 'eq', page.id)
            .sort('name')
            .get();

        return await this.view.render('content/create_page',{
            pages : pagesRes,
            page : page,
            templates : templatesRes,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let page = {
            id : post.get('id'),
            url : Util.url(post.get('name')),
            active : post.getInt('active'),
            name : post.get('name'),
            template_id : post.get('template_id')
        }; 

        validator.add('name', page, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
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
            let result;

            if(post.id){
                result = await this.db.collection('pages').update(post.id, page); 
            }else{
                result = await this.db.collection('pages').create(page); 
            }

            this.request.flash({
                message : `page ${page.name}`,
                success : result.success
            });
        }

        return await this.get(post.id, page, validator.errors());
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