const HttpController = req('core.http.HttpController');
const Html = req('core.Html');
const Util = req('core.Util');

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

        let settingsRes = await this.db.collection('settings').get();

        if(!settingsRes.empty()){
            this.settings = settingsRes.first();
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

        this.view.param('settings', this.settings);
        this.view.param('request', this.request);
        this.view.param('html', Html);
        this.view.param('util', Util);

        this.view.prependFile('shared/header');
        this.view.appendFile('shared/footer');
    }
}

module.exports = ConsoleController;