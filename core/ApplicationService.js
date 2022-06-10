
const fs = require('fs/promises');

class ApplicationService{

    constructor(config, rootDir, name, appStorage){
        this._config = config;
        this._rootDir = rootDir;
        this._name = name;
        this._appStorage = appStorage
    }

    async loadStaticFile(path, request, response){
        try{
            let file = path.concat(request.url().pathname());
            let buffer = await fs.readFile(file);

            let mimeTypes = new Map();
            mimeTypes.set('css', 'text/css');
            mimeTypes.set('svg', 'image/svg+xml');

            if(mimeTypes.has(request.url().extension())){
                //response.contentType(mimeTypes.get(request.url().extension()));
            }


            response.write(buffer).flush(); 
        }catch(e){}
    }

    config(){
        return this._config;
    }

    rootDir(){
        return this._rootDir;
    }

    name(){
        return this._name;
    }

    appStorage(){
        return this._appStorage;
    }

    async load(request, response){}

    async run(routes, request, response, dependencies){

        for(let route of routes){

            if(route.path == request.url().pathname() || route.path == '*'){

                let controller = new (require(this._rootDir.concat('/').concat(route.controller)))();
                Object.assign(controller, dependencies, { rootDir : this._rootDir, config: this._config, appStorage : this._appStorage, request, response });

                let output = '';

                if(await controller.authorize()){
                    output = await controller.execute();
                }

                if(output instanceof Object){
                    output = JSON.stringify(output);
                    response.contentType('application/json');
                }else{
                    response.contentType('text/html; charset=UTF8');
                }

                response.write(output).flush();
                break;
            }
        }
    }

    async error(e){}
}

module.exports = ApplicationService;