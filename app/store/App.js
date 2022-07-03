const Application = require('../../core/Application');
const Routes = require('../../core/Routes');

class App extends Application{

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