
const fs = require('fs/promises');

class ApplicationService{

    constructor(config, rootDir, name){
        this._config = config;
        this._rootDir = rootDir;
        this._name = name;
    }

    async loadStaticFile(path, request, response){
        try{
            let file = path.concat(request.url().pathname);
            let buffer = await fs.readFile(file);

            response.write(buffer).flush(); 
        }catch(e){}
    }

    async load(request, response){}

    async run(routes, request, response, dependencies){

        for(let route of routes){

            if(route.path == request.url().pathname || route.path == '*'){

                let controller = new (require(this._rootDir.concat('/').concat(route.controller)))();
                Object.assign(controller, dependencies, { rootDir : this._rootDir, request, response, config: this._config });

                let output = await controller.execute(request, response);

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