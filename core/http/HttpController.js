const Controller = require('./Controller');

class HttpController extends Controller{

    async get(){}

    async execute(request, response){
        
        switch(request.method()){
            case 'GET':
                return await this.get();
        }
    }
}

module.exports = HttpController;