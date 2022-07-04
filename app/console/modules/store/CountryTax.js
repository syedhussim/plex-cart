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

        console.log(post);
    }
}

module.exports = CountryTax;