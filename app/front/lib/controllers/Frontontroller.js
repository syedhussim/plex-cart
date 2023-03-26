const HttpController = req('core.http.HttpController');
const View = req('core.View');
const Html = req('core.Html');

class Frontontroller extends HttpController{

    async load(){

        let settingsRes = await this.db.collection('settings').get();

        if(!settingsRes.empty()){

            this.settings = settingsRes.first();

            for(let middleware of this.config.middleware || []){
                let middlewareClass = new (req(middleware))();
                middlewareClass.before(this);
            }

            this.view = new View(this.root.concat('/app/front/templates/' + this.settings.theme + '/views/'));
            this.view.param('settings', this.settings);
            this.view.param('request', this.request);
            this.view.param('html', Html);
            this.view.param('url', (path) => { return this.settings.url + path; });

            for(let middleware of this.config.middleware || []){
                let middlewareClass = new (req(middleware))();
                middlewareClass.after(this);
            }
        }
    }
}

module.exports = Frontontroller;