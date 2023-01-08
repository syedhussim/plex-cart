const Intlz = req('core.Intlz');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class Edit extends ConsoleController{

    async get(settings = null, errors = new Validation.ValidatorErrors()){

        if(!settings){
            let settingsRes = await this.db.collection('settings').get();

            settings = settingsRes.firstOrDefault({
                id : '',
                name : '',
                url : '',
                locale : '',
                timezone : ''
            });
        }

        return await this.view.render('settings/edit',{
            settings : settings,
            currencies : Intlz.currencies(),
            locales : Intlz.locales(),
            timeZones : Intlz.timeZones(),
            errors : errors
        });
    }

    async post(){
        
        let post = this.request.post();

        let validator = new Validation.Validator();
        
        let settings = {
            name : post.get('name'),
            url : post.get('url'),
            locale : post.get('locale'),
            timezone : post.get('timezone')
        };

        validator.add('name', settings, [
            new Validation.Required('Name is required'),
            new Validation.MaxLength(50, 'Name must not exceed @length characters')
        ]).add('url', settings, [
            new Validation.Required('Store URL is required'),
        ]).add('locale', settings, [
            new Validation.Required('Regional Format is required'),
            new Validation.MaxLength(10, 'Regional Format must not exceed @length characters')
        ]).add('timezone', settings, [
            new Validation.Required('Timezone is required'),
            new Validation.MaxLength(50, 'Timezone must not exceed @length characters')
        ]);

        if(validator.isValid()){


            let result = await this.db.collection('settings').updateOrInsert(post.id, settings);

            this.request.flash({
                message : 'Settings have been updated',
                success : result.success
            });

            return await this.get(settings);
        }

        return await this.get(settings, validator.errors());
    }
}

module.exports = Edit;