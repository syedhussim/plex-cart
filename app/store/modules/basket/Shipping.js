const StoreController = req('app.store.lib.controllers.StoreController');

class Shipping extends StoreController{

    async get(){
        
        return this.view.render('basket/shipping', {
        });
    }

    async post(){
        let post = this.request.post();
        console.log(post);
    }
}

module.exports = Shipping; 