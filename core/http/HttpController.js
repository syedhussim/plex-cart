const Controller = require('./Controller');

class HttpController extends Controller{

    async get(){}

    async post(){}

    async execute(request, response){

        let params = request.query().values();

        switch(request.method()){
            case 'GET':
                return await this.get(...params);
            case 'POST': 
                return await this.post(...params);
        }
    }
}

module.exports = HttpController;