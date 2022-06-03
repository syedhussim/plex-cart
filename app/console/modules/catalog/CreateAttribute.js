const ConsoleController = req('app.console.lib.ConsoleController');

class CreateAttribute extends ConsoleController{

    async get(){
        return await this.view.render('catalog/create_attribute',{
        });
    }

    async post(){

        let post = this.request.post();

        let attribute = {
            name : post.name,
            property : post.property,
            type : post.type,
            menu_items : post.menu_items,
            required : post.required
        }

        await this.db.collection('attributes').create(attribute); 
        
    }
}

module.exports = CreateAttribute;