const ApplicationService = require('../../core/ApplicationService');
const Routes = require('../../core/Routes');

class App extends ApplicationService{

    async load(request, response){

        let routes = new Routes();
        routes.add('/home', '/Home/Inde');
        routes.add('*', 'core/http/NotFoundController');

        await this.run(routes, request, response);
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;