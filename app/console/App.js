const ApplicationService = require('../../core/ApplicationService');
const Routes = require('../../core/Routes');

class App extends ApplicationService{

    async load(request, response){

        let routes = new Routes();
        routes.add('/catalog/products', 'catalog/Products');

        let dependencies = {
            name : 'Syed'
        };
        
        await this.run(routes, request, response, dependencies);
    }

    async error(e){
        console.log(e.message);
    }
}

module.exports = App;