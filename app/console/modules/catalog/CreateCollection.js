const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CreateCollection extends ConsoleController{

    async get(id = null, collection = null, errors = new Validation.ValidatorErrors()){

        if(!collection){
            collection = await this.db.collection('collections').find(id, {
                id : '',
                name : '',
                property : '',
                type : '',
                visibility : 3
            });
        }

        let collectionsRes = await this.db.collection('collections').get();

        let attributes = await this.db.collection('attributes')
            .sort('name')
            .get();

        for(let attribute of attributes){
            if(attribute.type == 'ATTR_MENU'){
                attribute.menu_items = attribute.menu_items.split("\n").map(v => { return v.trim() });
            }
        }

        return await this.view.render('catalog/create_collection',{
            collections : collectionsRes,
            attributes : attributes,
            collection : collection,
            errors : errors
        });
    }

    async post(){

        let post = this.request.post();

        console.log(post);
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

module.exports = CreateCollection;