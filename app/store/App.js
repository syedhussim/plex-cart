const Application = require('../../core/Application');
const DatabaseEngine = require('../../core/data/DatabaseEngine');

class App extends Application{

    async load(){

        let url = this.request.url().pathname();

        let db = DatabaseEngine.create(this.config.db, this.appStorage);

        let pagesRes = await db.collection('pages')
            .where('url', 'eq', url)
            .get();

        if(!pagesRes.empty()){
            this.routes.add(url, 'app/store/modules/content/Page');
        }
    
        this.dependencies({ db : db });
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;