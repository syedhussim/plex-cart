const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');
const fs = require('fs/promises');

class CreateTemplate extends ConsoleController{

    async get(pid, id = null, template = null, errors = new Validation.ValidatorErrors()){

        let pageRes = await this.db.collection('pages')
            .where('id', 'eq', pid)
            .get();

        if(!pageRes.empty()){

            let page = pageRes.first();

            let pagesRes = await this.db.collection('pages')
                .sort('name', 'ASC')
                .get();

            if(!template){
                template = await this.db.collection('templates').find(id, {
                    id : '',
                    name : '',
                    code : '',
                    template_file : '',
                    page_id : page.id,
                    attributes : {}
                });
            }

            let attributesRes = await this.db.collection('attributes')
                .where('active', 'eq', 1)
                .sort('name')
                .get();

            let templateAttributeRes = await this.db.collection('template_attributes')
                .where('page_id', 'eq', page.id)
                .where('template_id', 'eq', template.id)
                .get();

            attributesRes = attributesRes.fullJoin(templateAttributeRes, 'id', 'attribute_id', ['template_id']);

            this.settings.theme = 'pb';
            let files = await fs.readdir(this.root.concat('/app/front/templates/' + this.settings.theme + '/views/content'), { 
                withFileTypes: true
            });

            let templateFiles = files.filter((dirent) => dirent.isFile()).map(dirent => { return dirent.name });

            return await this.view.render('content/create_template',{
                pages : pagesRes,
                page : page,
                template : template,
                templateFiles : templateFiles,
                attributes : attributesRes,
                errors : errors
            });
        }
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let properties = Object.keys(post);

        let template = {
            id : post.get('id'),
            name : post.get('name'),
            code : post.get('code').toUpperCase(),
            template_file : post.get('template_file'),
            page_id : post.get('page_id'),
            attributes : {}
        }; 

        validator.add('name', template, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]).add('template_file', template, [
            new Validation.Required('Template File is required'),
        ]);

        for(let property of properties){
            if(property.substring(0,5) == 'attr_'){
                let productAttribute = property.substring(5);

                let attributeResult = await this.db.collection('attributes')
                    .where('property', 'eq', productAttribute)
                    .get();

                if(!attributeResult.empty()){
                    let attribute = attributeResult.first();

                    template.attributes[productAttribute] = { name : attribute.name, value : post[property].trim() };

                    if(attribute.required){
                        validator.add(property, template.attributes[productAttribute].value, [
                            new Validation.Required(`${attribute.name} is required`)
                        ]);
                    }
                }
            }
        }

        if(validator.isValid()){
            let result;

            if(template.id){
                result = await this.db.collection('templates').update(template.id, template); 
            }else{
                result = await this.db.collection('templates').create(template); 
            }

            this.request.flash({
                message : `Template ${template.name}`,
                success : result.success
            });

            this.response.redirect(`/content/templates/create?pid=${template.page_id}&id=${template.id}`);
            return;
        }

        return this.get(template.page_id, template.id, template, validator.errors());
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