const http = require('http');
const Request = require('./http/Request');
const Response = require('./http/Response');

class Server{

    constructor(rootDir){
        this._rootDir = rootDir;
    }

    start(apps = []){

        this._registerGlobals();

        for(let app of apps){

            app.loadConfig(this._rootDir);

            http.createServer(async(req, res) => {

                const request = new Request(req);
                const response = new Response(res);

                await app.load(this._rootDir, request, response);

            }).listen(app.port());
        }
    }

    _registerGlobals(){
        global.req = (path) => {
            return require(this._rootDir.concat('/').concat(path.replace(/\./g, '/')));
        }
    }
}

module.exports = Server;