const ConsoleController = req('app.console.lib.ConsoleController');

class ShippingCountries extends ConsoleController{


    async get(){

        let countriesRes = await this.db.collection('countries')
            .sort('code', 'ASC')
            .get();

        let shippingCountriesRes = await this.db.collection('shipping_countires')
            .where('country_id', 'in', countriesRes.select('id'))
            .get();

        return await this.view.render('store/shipping_countires',{
            countries : countriesRes,
            shippingCountryIds : shippingCountriesRes.select('country_id')
        });
    }

    async post(){
        let post = this.request.post();

        if(post.state == 1){

            await this.db.collection('shipping_countires').delete({ property : 'country_id', value : post.country_id });

            return {
                success : 200,
                state : 0
            }
        }else{
            let shippingCountry = {
                country_id : post.country_id
            };

            await this.db.collection('shipping_countires').create(shippingCountry);
            
            return {
                success : 200,
                state : 1
            }
        }
    }
}

module.exports = ShippingCountries;