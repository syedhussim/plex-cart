const Application = require('../../core/Application');
const DatabaseEngine = require('../../core/data/DatabaseEngine');

class App extends Application{

    async load(){

        let url = this.request.url().pathname();

        let db = DatabaseEngine.create(this.config.db, this.appStorage);

        let pagesRes = null;

        if(url == '/'){
            pagesRes = await db.collection('pages')
                .where('is_default_page', 'eq', 1)
                .where('active', 'eq', 1)
                .get();
        }else{
            pagesRes = await db.collection('pages')
                .where('url', 'eq', url)
                .where('active', 'eq', 1)
                .get();
        }

        if(!pagesRes.empty()){
            this.routes.add(url, 'app/front/modules/content/Page');
        }
    
        this.dependencies({ db : db });
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;