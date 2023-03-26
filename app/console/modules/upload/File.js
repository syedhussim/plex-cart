const ConsoleController = req('app.console.lib.ConsoleController');
const fs = require('fs/promises');

class File extends ConsoleController{

    async post(){

        let post = this.request.post();

        let path = this.root.concat('/app/front/templates/' + this.settings.theme + '/') + post.path;

        let file = path + '/' + post.file;

        await fs.mkdir(path, { recursive: true });
        fs.writeFile(file, Buffer.from(post.data,  'base64'));
    }
}

module.exports = File;