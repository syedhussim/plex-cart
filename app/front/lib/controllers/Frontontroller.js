const HttpController = req('core.http.HttpController');
const View = req('core.View');
const Html = req('core.Html');

class Frontontroller extends HttpController{

    async load(){

        let settingsRes = await this.db.collection('settings').get();

        if(!settingsRes.empty()){

            this.store = settingsRes.first();

            for(let middleware of this.config.controller || []){
                let middlewareClass = new (req(middleware))();
                middlewareClass.before(this);
            }
            this.store.theme = 'pb';
            this.view = new View(this.root.concat('/app/front/templates/' + this.store.theme + '/views/'));
            this.view.param('store', this.store);
            this.view.param('request', this.request);
            this.view.param('html', Html);
            this.view.param('url', (path) => { return this.store.url + path; });

            for(let middleware of this.config.controller || []){
                let middlewareClass = new (req(middleware))();
                middlewareClass.after(this);
            }
        }
    }
}

module.exports = Frontontroller;