class ApplicationService{

    constructor(rootDir, name){
        this._rootDir = rootDir;
        this._name = name;
    }

    async load(request, response){}

    async run(routes, request, response, dependencies){

        for(let route of routes){
            if(route.path == request.url().pathname){

                let controller = new (require(this._rootDir.concat('/app/').concat(this._name).concat('/modules/').concat(route.controller)))();
                Object.assign(controller, dependencies, { rootDir : this._rootDir, request, response });

                let output = await controller.execute(request, response);

                if(output instanceof Object){
                    output = JSON.stringify(output);
                }

                response.write(output).flush();
            }
        }
    }

    async error(e){}
}

module.exports = ApplicationService;