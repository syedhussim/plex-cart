const Intlz = req('core.Intlz');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class Settings extends ConsoleController{

    async get(settings = null, errors = new Validation.ValidatorErrors()){

        if(!settings){
            let storesRes = await this.db.collection('stores').get();

            if(!storesRes.empty()){
                settings = storesRes.first();
            }
        }

        // console.log(Intl.NumberFormat(settings.locale, {currency: 'USD', style:"currency"}).format(3000.99));

        return await this.view.render('store/settings',{
            settings : settings,
            locales : Intlz.locales(),
            errors : errors
        });
    }

    async post(){
        
        let post = this.request.post();
        
        let store = {
            name : post.name,
            store_email : post.store_email,
            store_phone : post.store_phone,
            locale : post.locale
        };

        await this.db.collection('stores').update(post.id, store);

        return await this.get(store);
    }
}

module.exports = Settings;