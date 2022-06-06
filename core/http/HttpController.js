const Controller = require('./Controller');

class HttpController extends Controller{

    async get(){}

    async post(){}

    async execute(){

        await this.load();

        let params = this.request.query().values();

        switch(this.request.method()){
            case 'GET':
                return await this.get(...params);
            case 'POST': 
                return await this.post(...params);
        }
    }
}

module.exports = HttpController;