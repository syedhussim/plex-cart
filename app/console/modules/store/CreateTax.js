const ConsoleController = req('app.console.lib.ConsoleController');
const Validation = req('core.Validation');

class CreateTax extends ConsoleController{

    async get(tax, errors = new Validation.ValidatorErrors()){

        let shippingCountriesRes = await this.db.collection('shipping_countires')
            .get();

        let countriesRes = await this.db.collection('countries')
            .where('id', 'in', shippingCountriesRes.select('country_id'))
            .sort('code', 'ASC')
            .get();

        return await this.view.render('store/create_tax',{
            tax : {},
            countries : countriesRes,
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

module.exports = CreateTax;