
const Collection = require('./Collection');

class Database{

    constructor(config){
        this._config = config;
    }

    collection(name){ 
        return new Collection(this._config, name);
    }
}

module.exports = Database;