const ApplicationService = require('../../core/ApplicationService');
const Routes = require('../../core/Routes');
const View = require('../../core/View');

class App extends ApplicationService{

    async load(request, response){

        let routes = new Routes();
        routes.add('/catalog/products', 'app/console/modules/catalog/Products');
        routes.add('*', 'core/http/NotFoundController');
    
        let dependencies = {
            view : new View(this.rootDir().concat('/app/console/templates/omega/views/'))
        };
        
        await this.run(routes, request, response, dependencies);
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;