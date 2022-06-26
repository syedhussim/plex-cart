const Application = require('../../core/Application');
const DatabaseEngine = require('../../core/data/DatabaseEngine');
const View = require('../../core/View');

class App extends Application{

    async load(){

        this.routes.add('/catalog/products', 'app/console/modules/catalog/Products');
        this.routes.add('/catalog/products/create', 'app/console/modules/catalog/CreateProduct');
        this.routes.add('/catalog/attributes', 'app/console/modules/catalog/Attributes');
        this.routes.add('/catalog/attributes/create', 'app/console/modules/catalog/CreateAttribute');
        this.routes.add('/catalog/import/feed', 'app/console/modules/catalog/ImportFeed');

        this.routes.add('/media/library', 'app/console/modules/media/Library');
        this.routes.add('/media/library.json', 'app/console/modules/media/Library');
    
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