const Routes = require('../core/Routes');

class Application{

    constructor(root, config, appStorage, request, response){
        this._root = root;
        this._config = config;
        this._appStorage = appStorage;
        this._request = request;
        this._response = response;
        this._routes = new Routes();
        this._dependencies = {};
    }

    get root(){
        return this._root;
    }

    get config(){
        return this._config;
    }

    get appStorage(){
        return this._appStorage;
    }

    get request(){
        return this._request;
    }

    get response(){
        return this._response;
    }

    get routes(){
        return this._routes;
    }

    dependencies(dependencies){
        this._dependencies = dependencies;
    }

    async load(){}

    async run(){

        for(let route of this.routes){

            if(route.path == this.request.url().pathname() || route.path == '*'){

                let controller = new (require(this.root.concat('/').concat(route.controller)))();
                
                Object.assign(controller, { 
                    ...this._dependencies,
                    root : this.root, 
                    config : this.config, 
                    appStorage : this._appStorage, 
                    request : this.request, 
                    response : this.response,
                });

                let output = '';

                if(await controller.authorize()){
                    output = await controller.execute();
                }

                if(output instanceof Object){
                    output = JSON.stringify(output);
                    this.response.contentType('application/json');
                }else{
                    this.response.contentType('text/html; charset=UTF8');
                }

                this.response.write(output).flush();
                break;
            }
        }
    }

    async error(e){}
}

module.exports = Application;