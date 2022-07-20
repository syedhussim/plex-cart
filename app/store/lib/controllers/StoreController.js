const HttpController = req('core.http.HttpController');
const View = req('core.View');
const Html = req('core.Html');
const Session = req('app.store.lib.basket.Session');

class StoreController extends HttpController{

    async load(){

        let storesRes = await this.db.collection('stores').get();

        if(!storesRes.empty()){

            this.store = storesRes.first();

            this.models = new Map();
            this.models.set('product', 'app.store.lib.models.Product');

            for(let middleware of this.config.middleware || []){
                let middlewareClass = new (req(middleware))();
                middlewareClass.load(this);
            }

            this.basket = new Session(this.config.session, this.request, this.response, this.db, this.models);
            await this.basket.refresh();

            this.view = new View(this.root.concat('/app/store/templates/alpha/views/'));
            this.view.param('store', this.store);
            this.view.param('request', this.request);
            this.view.param('basket', this.basket);
            this.view.param('html', Html);
            this.view.param('money', (amount) => {
                let formatter = new Intl.NumberFormat(this.store.locale, {
                    style: 'currency',
                    currency: this.store.currency,
                });
                
                return formatter.format(amount);
            });
            this.view.param('url', (path) => {
                return this.store.url + path;
            });
        }
    }
}

module.exports = StoreController;