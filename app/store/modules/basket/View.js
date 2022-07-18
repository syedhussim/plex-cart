const StoreController = req('app.store.lib.controllers.StoreController');

class View extends StoreController{

    async get(){
        

    }

    async post(){
        console.log('ok')
    }
}

module.exports = View; 