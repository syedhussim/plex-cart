const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateAttribute extends ConsoleController{

    async get(id = null, attribute = null, errors = new Validation.ValidatorErrors()){

        let attributes = await this.db.collection('attributes').get();

        if(!attribute){
            attribute = await this.db.collection('attributes').find(id, {
                id : '',
                active : 0,
                name : '',
                property : '',
                type : '',
                visibility : 3
            });
        }

        let visibility = [
            'Internal',
            'Product',
            'Product - Collection',
            'Product - Collection - Basket'
        ];

        return await this.view.render('catalog/create_attribute',{
            attributes : attributes,
            attribute : attribute,
            visibility : visibility,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        let validator = new Validation.Validator();

        let attribute = {
            id : post.get('id'),
            active : post.getInt('active'),
            name : post.get('name'),
            property : post.get('property'),
            type : post.get('type'),
            menu_items : post.get('menu_items'),
            visibility : post.getInt('visibility'),
            required : post.getInt('required')
        }; 

        validator.add('name', attribute, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]).add('property', attribute, [
            new Validation.Required('Property Name is required'),
            new Validation.MaxLength(50, 'Property Name must not exceed @length characters')
        ]).add('type', attribute, [
            new Validation.Required('Type is required')
        ]).add('visibility', attribute, [
            new Validation.Required('Visibility is required')
        ]);

        if(validator.isValid()){
            let result;

            if(post.id){
                result = await this.db.collection('attributes').update(post.id, attribute); 
            }else{
                result = await this.db.collection('attributes').create(attribute); 
            }

            this.request.flash({
                message : `attribute ${attribute.name}`,
                success : result.success
            });

            return await this.get(post.id, attribute);
        }

        return await this.get(post.id, attribute, validator.errors());
    }

    async delete(){
        let post = this.request.post();

        if(post.id){
            let result = await this.db.collection('attributes').delete(post.id);

            return result;
        }

        return {
            success : false
        }
    }
}

module.exports = CreateAttribute;