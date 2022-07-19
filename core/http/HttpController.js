const Controller = require('./Controller');

class HttpController extends Controller{

    async load(){}

    async unload(){}

    async get(){}

    async post(){}

    async delete(){}

    async execute(){

        await this.load();

        let params = this.request.query().values();

        let result;

        switch(this.request.method()){
            case 'GET':
                result = await this.get(...params);
                break;
            case 'POST': 
                result = await this.post(...params);
                break;
            case 'DELETE': 
                result = await this.delete(...params);
                break;
        }

        await this.unload();

        return result;
    }
}

module.exports = HttpController;