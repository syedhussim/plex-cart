class Test{

    before(controller){
        let [lang] = controller.request.url().segments();
        
        if(lang == 'de'){ 
            controller.models.set('page', 'lib.models.DEPage');
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