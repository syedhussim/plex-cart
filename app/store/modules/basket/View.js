const StoreController = req('app.store.lib.controllers.StoreController');

class View extends StoreController{

    async get(){
        
        return this.view.render('basket/view', {
        });
    }

    async post(){
        
        let post = this.request.post();
        
        let item = {
            id : post.get('id'),
            quantity : post.getInt('quantity')
        };

        this.basket.add(item);
    }
}

module.exports = View; 