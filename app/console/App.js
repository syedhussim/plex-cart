const ApplicationService = require('../../core/ApplicationService');
const Routes = require('../../core/Routes');
const DatabaseEngine = require('../../core/data/DatabaseEngine');
const View = require('../../core/View');

class App extends ApplicationService{

    async load(request, response){

        let routes = new Routes();
        routes.add('/catalog/products', 'app/console/modules/catalog/Products');
        routes.add('/catalog/products/create', 'app/console/modules/catalog/CreateProduct');
        routes.add('/catalog/attributes', 'app/console/modules/catalog/Attributes');
        routes.add('/catalog/attributes/create', 'app/console/modules/catalog/CreateAttribute');

        routes.add('/css/base', 'app/console/modules/build/CssBase');
        routes.add('*', 'core/http/NotFoundController');
    
        let dependencies = {
            db : DatabaseEngine.create(this.config().db, this.appStorage()),
            view : new View(this.rootDir().concat('/app/console/templates/omega/views/'))
        };
        
        await this.run(routes, request, response, dependencies);
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;