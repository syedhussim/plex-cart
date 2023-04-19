const ConsoleController = req('app.console.lib.ConsoleController');
const WebRequest = req('core.WebRequest');
const fs = require('fs/promises');

class Update extends ConsoleController{

    async get(){

        await this.readDir(this.root.concat('/app'));
        await this.readDir(this.root.concat('/core'));
    }

    async readDir(path){

        let files = await fs.readdir(path, { 
            withFileTypes: true
        });
        
        for(let entry of files){

            if(entry.isDirectory()){
                await this.readDir(path + '/' + entry.name);
            }else{

                let options = {
                    hostname : 'raw.githubusercontent.com',
                    port : 443,
                    path : '/syedhussim/plex-cart/master' + path.replace(this.root, '') + '/' + entry.name,
                    method : 'GET',
                    https : true
                };

                let response = await WebRequest.request(options);

                if(response.statusCode == 200){

                    let data = await fs.writeFile(path + '/' + entry.name, response.data);
                    console.log(path + '/' + entry.name);
                }
            }
        }
    }
}

module.exports = Update;