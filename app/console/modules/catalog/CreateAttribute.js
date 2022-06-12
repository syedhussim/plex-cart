const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateAttribute extends ConsoleController{

    async get(id = null, attribute = null, errors = new Validation.ValidatorErrors()){

        let attributes = await this.db.collection('attributes').get();

        if(!attribute){
            attribute = await this.db.collection('attributes').find(id, {
                id : '',
                name : '',
                property : '',
                type : '',
            });
        }

        return await this.view.render('catalog/create_attribute',{
            attributes : attributes,
            attribute : attribute,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let attribute = {
            name : post.name,
            property : post.property,
            type : post.type,
            menu_items : post.menu_items,
            required : post.required
        };

        validator.add('name', attribute, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]).add('property', attribute, [
            new Validation.Required('Property Name is required'),
            new Validation.MaxLength(50, 'Property Name must not exceed @length characters')
        ]);

        if(validator.isValid()){
            let result;
            let action = '';

            if(post.id){
                result = await this.db.collection('attributes').update(post.id, attribute); 
                action = 'Updated';
            }else{
                result = await this.db.collection('attributes').create(attribute); 
                action = 'Created';
            }

            this.request.flash({
                message : `${action} attribute ${attribute.name}`,
                success : result ? true : false,
                error : 'Operation failed'
            });

            return await this.get(post.id, attribute);
        }

        return await this.get(post.id, attribute, validator.errors());
    }

    async delete(){
        let post = this.request.post();

        if(post.id){
            let result = await this.db.collection('attributes').delete(post.id);
            console.log(result);
        }
    }
}

module.exports = CreateAttribute;