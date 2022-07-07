const ConsoleController = req('app.console.lib.ConsoleController');
const Util = req('core.Util');
const Validation = req('core.Validation');

class CountryTax extends ConsoleController{

    async get(id, countryTax = null, errors = new Validation.ValidatorErrors()){

        let countriesRes = await this.db.collection('countries')
            .where('id', 'in', id)
            .get();

        if(!countriesRes.empty()){
            let country = countriesRes.first();

            if(!countryTax){
                let countryTaxesRes = await this.db.collection('country_taxes')
                    .where('country_id', 'eq', country.id)
                    .get();

                if(!countryTaxesRes.empty()){
                    countryTax = countryTaxesRes.first(); 
                }else{
                    countryTax = {
                        name : '',
                        tax_percentage : 0,
                        states : {}
                    };

                    for(let state of country.states){
                        countryTax.states[state.code] = '';
                    }
                }
            }

            return await this.view.render('store/country_tax',{
                countryTax : countryTax,
                country : country,
                errors : errors
            });
        }
    }

    async post(id){

        let countriesRes = await this.db.collection('countries')
            .where('id', 'eq', id)
            .get();

        if(countriesRes.empty()){
            return;
        }

        let post = this.request.post();

        let validator = new Validation.Validator();

        let country = countriesRes.first();
        
        let countryTax = {
            country_id : country.id,
            name : post.get('name'),
            tax_percentage : post.getFloat('tax_percentage'),
            states : {}
        };

        validator.add('name', countryTax, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]).add('tax_percentage', countryTax, [
            new Validation.IsFloat('Tax Percentage is not valid'),
        ]);

        for(let state of country.states){

            countryTax.states[state.code] = '';

            let statePercentage = post.get('state_' + state.code).trim();

            if(statePercentage){
                if(Util.isFloat(statePercentage)){
                    countryTax.states[state.code] = Util.tryParseFloat(statePercentage);
                }else{
                    countryTax.states[state.code] = statePercentage;
                    validator.addError('state_' + state.code, `Invalid value`);
                }
            }
        }
        

        if(validator.isValid()){
            let countryTaxesRes = await this.db.collection('country_taxes')
                .where('country_id', 'eq', countryTax.country_id)
                .get();
                
            let result;

            if(countryTaxesRes.empty()){
                let x = await this.db.collection('country_taxes').create(countryTax);

            }else{

                result = await this.db.collection('country_taxes').update(countryTaxesRes.first().id, countryTax);
            }

            this.request.flash({
                success : result.success,
                message : `Tax details for ${country.name} has been updated.`,
            });
        }

        return await this.get(id, countryTax, validator.errors());
    }
}

module.exports = CountryTax;