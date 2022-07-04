const ConsoleController = req('app.console.lib.ConsoleController');
const Validation = req('core.Validation');

class CountryTax extends ConsoleController{

    async get(id, errors = new Validation.ValidatorErrors()){

        let countriesRes = await this.db.collection('countries')
            .where('id', 'in', id)
            .get();

        let country = null;

        if(!countriesRes.empty()){
            country = countriesRes.first();
        }

        return await this.view.render('store/country_tax',{
            tax : {},
            country : country,
            errors : errors
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

module.exports = CountryTax;