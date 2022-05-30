const ApplicationService = require('../../core/ApplicationService');
const Routes = require('../../core/routing/Routes');

class App extends ApplicationService{

    async load(request, response){

        let routes = new Routes();
        routes.add('/home', '/Home/Inde');

        response.write('front');
        response.flush();

        await this.run(routes, request, response);
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;