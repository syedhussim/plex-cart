const ConsoleController = req('app.console.lib.ConsoleController');
const fs = require('fs/promises');

class File extends ConsoleController{

    async authorize(){
        
        let settingsRes = await this.db.collection('settings').get();

        if(!settingsRes.empty()){
            let settings = settingsRes.first();

            if(this.request.query().get('key') == settings.api_key){
                return true;
            }
        }

        this.response.json({ message : 'Unauthorised access'}, 401);
        return false;
    }

    async post(){

        let post = this.request.post();

        let path = this.root.concat('/app/front/templates/' + this.settings.theme + '/') + post.path;

        let file = path + '/' + post.file;

        await fs.mkdir(path, { recursive: true });
        fs.writeFile(file, Buffer.from(post.data,  'base64'));
    }
}

module.exports = File;