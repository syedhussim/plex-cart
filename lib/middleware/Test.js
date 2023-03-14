class Test{

    before(controller){
        let [lang] = controller.request.url().segments();

        if(lang == 'de'){ 

            controller.template = async(page) => {

                return await controller.db.collection('templates')
                    .where('page_id', 'eq', page.id)
                    .where('code', 'eq', 'FR')
                    .get();
            }
        }
    }

    after(controller){

        let [lang] = controller.request.url().segments();
        
        if(lang == 'de'){ 
            controller.view.param('url', (path) => {
                return controller.store.url + '/de' + path;
            });
        }
    }
}

module.exports = Test;