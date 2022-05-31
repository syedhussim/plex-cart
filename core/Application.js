class Application{

    constructor(name, port){
        this._name = name;
        this._port = port;
        this._appConfig = null;
    }

    name(){
        return this._name;
    }

    port(){
        return this._port;
    }

    async loadConfig(rootDir){
        const fs = require('fs');
        this._appConfig = JSON.parse(fs.readFileSync(rootDir.concat('/app/').concat(this._name).concat('/config.json')));
    }

    async load(rootDir, request, response){

        let baseDir = rootDir.concat('/app/').concat(this._name);
        let appService = new (require(baseDir.concat('/App.js')))(this._appConfig, rootDir, this._name);

        try{
            await appService.loadStaticFile(baseDir.concat('/templates/').concat(this._appConfig.theme).concat('/public'), request, response);
            
            if(!response.flushed()){
                await appService.load(request, response);
            }
            
        }catch(e){
            await appService.error(e);
        }
    }
}

module.exports = Application;