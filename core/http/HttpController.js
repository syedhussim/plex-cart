const Controller = require('./Controller');

class HttpController extends Controller{

    async get(){}

    async post(){}

    async delete(){}

    async execute(){

        await this.load();
console.log(this.request.query());
        let params = this.request.query().values();

        switch(this.request.method()){
            case 'GET':
                return await this.get(...params);
            case 'POST': 
                return await this.post(...params);
            case 'DELETE': 
                return await this.delete(...params);
        }
    }
}

module.exports = HttpController;