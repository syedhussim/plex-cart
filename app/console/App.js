const Application = require('../../core/Application');
const DatabaseEngine = require('../../core/data/DatabaseEngine');
const View = require('../../core/View');

class App extends Application{

    async load(){

        this.routes.add('/content/pages', 'app/console/modules/content/Pages');
        this.routes.add('/content/pages/create', 'app/console/modules/content/CreatePage');
        this.routes.add('/content/templates', 'app/console/modules/content/Templates');
        this.routes.add('/content/templates/create', 'app/console/modules/content/CreateTemplate');
        this.routes.add('/content/templates/attributes', 'app/console/modules/content/TemplateAttributes');
        this.routes.add('/content/attributes', 'app/console/modules/content/Attributes');
        this.routes.add('/content/attributes/create', 'app/console/modules/content/CreateAttribute');
        this.routes.add('/content/related/pages', 'app/console/modules/content/RelatedPages');

        this.routes.add('/media/library', 'app/console/modules/media/Library');
        this.routes.add('/media/library.json', 'app/console/modules/media/Library');

        this.routes.add('/settings', 'app/console/modules/settings/Edit');
    
        this.dependencies({
            db : DatabaseEngine.create(this.config.db, this.appStorage),
            view : new View(this.root.concat('/app/console/templates/omega/views/'))
        });
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;