const fs = require('fs/promises');

class Server{

    constructor(serverConfig, appConfig){
        this._serverConfig = serverConfig;
        this._appConfig = appConfig;
        this._appStorage = new Map();
    }

    async dispatch(request, response){

        let baseDir = this._serverConfig.root.concat('/app/').concat(this._serverConfig.name);

        this._rewrite(request);

        await this._tryFile(request, response);

        if(!response.flushed()){

            let appClass = require(baseDir.concat('/App.js'));

            let app = new appClass(
                this._serverConfig.root,
                this._appConfig,
                this._appStorage, 
                request, 
                response
            );

            try{
                await app.load();
                await app.run();

                if(!response.flushed()){
                    response.html('404 - Not found', 404);
                }

            }catch(e){
                await app.error(e);

                if(!response.flushed()){
                    response.html('500 - Internal server error', 500);
                }
            }
        }
    }

    _rewrite(request){
        let rewrites = this._serverConfig.url_rewrites || [];

        for(let rewrite of rewrites){
            let pattern = rewrite.from;

            let regex = new RegExp(pattern);
            let match = regex.exec(request.url().pathname());

            if(match){
                let to = rewrite.to || '';
                
                for(let [key,value] of Object.entries(match.groups)){
                    to = to.replaceAll('$' + key, value) ;
                }

                request.url().pathname(to);
            }
        }
    }

    async _tryFile(request, response){

        let locations =  this._serverConfig.locations || [];

        let vars = new Map();
        vars.set('root', this._serverConfig.root);
        vars.set('name', this._serverConfig.name);
        vars.set('uri', request.url().pathname());

        for(let location of locations){
            let uri = location.uri || '';
            let paths = location.paths || [];
            let deny = location.deny || false;

            let re = new RegExp(uri);

            if(re.test(request.url().pathname())){

                if(deny == false){

                    for(let path of paths){
                        for(let [key,value] of vars){ 
                            path = path.replaceAll('$' + key, value);
                        }

                        try{
                            let buffer = await fs.readFile(path);

                            response.write(buffer)
                                .contentType(response.mimeType(request.url().extension()))
                                .flush();
                            break;
                        }catch(e){}
                    }
                }
                break;
            }
        }
    }
}

module.exports = Server;