const ConsoleController = req('app.console.lib.ConsoleController');
const Validation = req('core.Validation');
const fs = require('fs/promises');

class Themes extends ConsoleController{

    async get(){

        let files = await fs.readdir(this.root.concat('/app/store/templates'), { 
            withFileTypes: true
        });

        let themeNames = files.filter((dirent) => dirent.isDirectory());

        let themes = [];

        for(let themeName of themeNames){
            let themeMetaFile = this.root.concat('/app/store/templates/').concat(themeName.name).concat('/theme.json');

            let theme;

            try{
                let themeData = await fs.readFile(themeMetaFile);
                theme = JSON.parse(themeData);
                theme.code = themeName.name;
                
                if(!theme.hasOwnProperty('image')){
                    theme.image = '';
                }
            }catch(e){
                theme = {
                    name: themeName.name,
                    code: themeName.name,
                    image: ''
                }
            }

            themes.push(theme);
        }

        return await this.view.render('store/themes',{
            themes : themes
        });
    }

    async post(){
        let post = this.request.post();

        let validator = new Validation.Validator();

        validator.add('name', post.get('theme'), [
            new Validation.Required('Theme is required')
        ]);

        if(validator.isValid()){
            let storesRes = await this.db.collection('stores').get();
            
            let store = storesRes.first();
            store.theme = post.get('theme');

            let result = await this.db.collection('stores').update(store.id, store);

            return {
                success : result.success
            };
        }

        return {
            success : false
        };
    }
}

module.exports = Themes;