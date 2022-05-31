const Controller = require('./Controller');

class NotFoundController extends Controller{

    async get(){}

    async execute(request, response){
        this.response.httpCode(404);
        return '404 not found';
    }
}

module.exports = NotFoundController;