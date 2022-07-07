const ConsoleController = req('app.console.lib.ConsoleController');

class Taxes extends ConsoleController{

    async get(){

        let shippingCountriesRes = await this.db.collection('shipping_countires')
            .get();

        let countriesRes = await this.db.collection('countries')
            .where('id', 'in', shippingCountriesRes.select('country_id'))
            .sort('code', 'ASC')
            .get();

        return await this.view.render('store/taxes',{
            countries : countriesRes,
        });
    }
}

module.exports = Taxes;