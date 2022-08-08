const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreatePage extends ConsoleController{

    async get(id = null, page = null, errors = new Validation.ValidatorErrors()){

        let pages = await this.db.collection('pages').get();

        if(!page){
            page = await this.db.collection('pages').find(id, {
                id : '',
                active : 0,
                name : '',
                content : ''
            });
        }

        return await this.view.render('content/create_page',{
            pages : pages,
            page : page,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let page = {
            id : post.get('id'),
            url : Util.url(post.get('name'), 'page'),
            active : post.getInt('active'),
            name : post.get('name'),
            content : post.get('content'),
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

            return await this.get(post.id, page);
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