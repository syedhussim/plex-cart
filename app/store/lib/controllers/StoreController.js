const HttpController = req('core.http.HttpController');
const View = req('core.View');
const Html = req('core.Html');

class StoreController extends HttpController{

    async load(){

        let storesRes = await this.db.collection('stores').get();

        if(!storesRes.empty()){
            this.store = storesRes.first();
        }

        this.models = new Map();
        this.models.set('product', 'app.store.lib.models.Product');

        this.view = new View(this.root.concat('/app/store/templates/alpha/views/'))
        this.view.param('store', this.store);
        this.view.param('request', this.request);
        this.view.param('html', Html);

        this.view.param('money', (amount) => {
            let formatter = new Intl.NumberFormat(this.store.locale, {
                style: 'currency',
                currency: this.store.currency,
            });
              
            return formatter.format(amount);
        });

        let middlewares = this.config.middleware || [];

        for(let middleware of middlewares){
            let middlewareClass = new (req(middleware))();
            middlewareClass.load(this);
        }
    }
}

module.exports = StoreController;