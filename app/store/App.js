const Application = require('../../core/Application');
const DatabaseEngine = require('../../core/data/DatabaseEngine');

class App extends Application{

    async load(){

        let url = this.request.url().pathname();

        let [type] = url.toLowerCase().split('/').filter(seg => seg.length > 0);

        if(type){
            switch(type){
                case 'page':
                    this.routes.add(url, 'app/store/modules/content/Page');
                    break;
                case 'product':
                    this.routes.add(url, 'app/store/modules/catalog/Product');
                    break;
                case 'collection':
                    this.routes.add(url, 'app/store/modules/catalog/Collection');
                    break;
            }
        }

        this.routes.add('/basket', 'app/store/modules/basket/View');
        this.routes.add('/basket/checkout/shipping', 'app/store/modules/basket/Shipping');

        this.dependencies({
            db : DatabaseEngine.create(this.config.db, this.appStorage)
        });
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;