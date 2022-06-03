class DatabaseEngine{

    static create(settings, appStorage){
        switch(settings.driver){
            case 'json':
                return new (require('./json/Database'))({ path : settings.path, cacheStorage : appStorage , cache : settings.cache });
        }
    }
}

module.exports = DatabaseEngine;