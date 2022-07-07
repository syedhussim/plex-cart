const Application = require('../../core/Application');
const DatabaseEngine = require('../../core/data/DatabaseEngine');
const View = require('../../core/View');

class App extends Application{

    async load(){

        this.routes.add('/catalog/products', 'app/console/modules/catalog/Products');
        this.routes.add('/catalog/products/create', 'app/console/modules/catalog/CreateProduct');
        this.routes.add('/catalog/attributes', 'app/console/modules/catalog/Attributes');
        this.routes.add('/catalog/attributes/create', 'app/console/modules/catalog/CreateAttribute');
        this.routes.add('/catalog/import/feed', 'app/console/modules/catalog/ImportFeed');

        this.routes.add('/media/library', 'app/console/modules/media/Library');
        this.routes.add('/media/library.json', 'app/console/modules/media/Library');

        this.routes.add('/store/settings', 'app/console/modules/store/Settings');
        this.routes.add('/store/shipping/countries', 'app/console/modules/store/ShippingCountries');
        this.routes.add('/store/taxes', 'app/console/modules/store/Taxes');
        this.routes.add('/store/taxes/country', 'app/console/modules/store/CountryTax');
        this.routes.add('/store/themes', 'app/console/modules/store/Themes');
        this.routes.add('/store/payment/gateways', 'app/console/modules/store/PaymentGateways');
        this.routes.add('/store/payment/gateways/manage', 'app/console/modules/store/ManagePaymentGateway');
        
        this.routes.add('/install/setup', 'app/console/modules/install/Setup');
    
        this.dependencies({
            db : DatabaseEngine.create(this.config.db, this.appStorage),
            view : new View(this.root.concat('/app/console/templates/omega/views/'))
        });
    }

    async error(e){
        console.log(e);
    }
}

module.exports = App;