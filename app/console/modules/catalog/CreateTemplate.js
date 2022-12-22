const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');
const fs = require('fs/promises');

class CreateTemplate extends ConsoleController{

    async get(cid, id = null,  template = null, errors = new Validation.ValidatorErrors()){

        let collectionRes = await this.db.collection('collections')
            .where('id', 'eq', cid)
            .get();

        if(!collectionRes.empty()){

            let collection = collectionRes.first();

            let collectionsRes = await this.db.collection('collections')
                .sort('name', 'ASC')
                .get();

            if(!template){
                template = await this.db.collection('templates').find(id, {
                    id : '',
                    name : '',
                    template_file : '',
                    collection_id : collection.id,
                    variables : {}
                });
            }

            let files = await fs.readdir(this.root.concat('/app/store/templates/' + this.store.theme + '/views/catalog/collections'), { 
                withFileTypes: true
            });

            let templateFiles = files.filter((dirent) => dirent.isFile()).map(dirent => { return dirent.name });

            return await this.view.render('catalog/create_template',{
                collections : collectionsRes,
                collection : collectionRes.first(),
                template : template,
                templateFiles : templateFiles,
                errors : errors
            });
        }
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let template = {
            id : post.get('id'),
            name : post.get('name'),
            template_file : post.get('template_file'),
            collection_id : post.get('collection_id'),
            variables : {}
        }; 

        validator.add('name', template, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]).add('template_file', template, [
            new Validation.Required('Template File is required'),
        ]);

        let varNames = post.getArray('var_name');
        let varValues = post.getArray('var_value');

        for(let i=0; i < varNames.length; i++){
            template.variables[varNames[i]] = varValues[i];
        }

        if(validator.isValid()){
            let result;

            if(post.id){
                result = await this.db.collection('templates').update(post.id, template); 
            }else{
                result = await this.db.collection('templates').create(template); 
            }

            this.request.flash({
                message : `Template ${template.name}`,
                success : result.success
            });

            return await this.get(template.collection_id, post.id, template);
        }

        return await this.get(post.id, template, validator.errors());
    }

    async delete(){
        let post = this.request.post();

        if(post.id){
            let result = await this.db.collection('templates').delete(post.id);

            return result;
        }

        return {
            success : false
        }
    }
}

module.exports = CreateTemplate;