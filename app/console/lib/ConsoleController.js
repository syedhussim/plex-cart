const HttpController = req('core.http.HttpController');
const Html= req('core.Html');

class ConsoleController extends HttpController{

    async authorize(){

        let session = this.config.session;

        if(session.dev){
            return true;
        }

        if(this.request.cookies().has(session.name)){
            let id = this.request.cookies().get(session.name);
            
            if(this.appStorage.has(id)){
                return true;
            }
        }

        this.response.html(await this.view.render('signin/index'));

        return false;
    }

    async load(){

        let storesRes = await this.db.collection('stores').get();

        if(!storesRes.empty()){
            this.store = storesRes.first();
        }

        this.request.register('flash', (value = null) => {
            if(value != null){
                this.appStorage.set('_FLASH_', value);
            }else{
                if(this.appStorage.has('_FLASH_')){
                    value = this.appStorage.get('_FLASH_');
                    this.appStorage.set('_FLASH_', '');
                    return value;
                }
                return {};
            }
        });

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

        this.view.prependFile('shared/header');
        this.view.appendFile('shared/footer');
    }
}

module.exports = ConsoleController;