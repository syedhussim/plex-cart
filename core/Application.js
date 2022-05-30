class Application{

    constructor(name, port){
        this._name = name;
        this._port = port;
    }

    name(){
        return this._name;
    }

    port(){
        return this._port;
    }

    async load(rootDir, request, response){
        let appService = new (require(rootDir.concat('/app/').concat(this._name).concat('/App.js')))(rootDir, this._name);

        try{
            await appService.load(request, response);
        }catch(e){
            await appService.error(e);
        }
    }
}

module.exports = Application;