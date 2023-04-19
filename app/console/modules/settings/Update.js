const ConsoleController = req('app.console.lib.ConsoleController');
const WebRequest = req('core.WebRequest');
const fs = require('fs/promises');

class Update extends ConsoleController{

    async get(){

        await this.readDir(this.root.concat('/app'));
        await this.readDir(this.root.concat('/core'));

        this.request.flash({
            message : 'System updated',
            success : true
        });

        this.response.redirect(`/settings`);
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
                    await fs.writeFile(path + '/' + entry.name, response.data);
                }
            }
        }
    }
}

module.exports = Update;