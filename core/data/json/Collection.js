
const fs = require('fs/promises');
const { serialize, deserialize } = require("v8");
const Util = require('../../Util');
const Result = require('./Result');

class Collection{

    constructor(config, name){
        this._config = config;
        this._name = name;
        this._filters = [];
        this._sort = null;
        this._limit = null;
    }

    where(property, op, value){
        this._filters.push({
            property : property,
            op : op,
            value : value
        });

        return this;
    }

    sort(property, direction = 'ASC'){
        this._sort = {
            property : property,
            direction : direction
        };
        return this;
    }

    limit(limit){
        this._limit = limit;
        return this;
    }

    async get(){
        let cache = this._config.data.cache;
        let data = [];

        if(cache.has(this._name)){
            data = cache.get(this._name);
        }else{
            try{
                let collectionFile = this._config.data.path.concat('/').concat(this._name).concat('.data');
                let buffer = await fs.readFile(collectionFile);
                data = deserialize(buffer);
                cache.set(this._name, data);
            }catch(e){}
        }

        let tmpArray = [];
        let count = 0;

        for(let row of data){

            let matchCount = 0;

            for(let filter of this._filters){

                let props = filter.property.split('.');
                
                switch(filter.op){
                    case 'eq':
                        if(this._getObjectValue(props, row) == filter.value){
                            matchCount++;
                        }
                        break;

                    case 'lt':
                        if(this._getObjectValue(props, row) < filter.value){
                            matchCount++;
                        }
                        break;

                    case 'gt':
                        if(this._getObjectValue(props, row) > filter.value){
                            matchCount++;
                        }
                        break;

                    case 'in':
                        if(filter.value.includes(this._getObjectValue(props, row))){
                            matchCount++;
                        }
                        break;
                }

                if(matchCount == this._filters.length){
                    tmpArray.push(row);
                }
            }

            if(this._filters.length == 0){
                tmpArray.push(row);
            }

            if(this._limit == count){
                break;
            }

            count++;
        }

        if(this._sort){
            tmpArray = tmpArray.sort((a, b) => {

                let v1 = this._getObjectValue(this._sort.property.split('.'), a);
                let v2 = this._getObjectValue(this._sort.property.split('.'), b);

                if(this._sort.direction == 'ASC'){
                    return v1.localeCompare(v2);
                }
                return v2.localeCompare(v1);
            });
        }

        data = null;
        return new Result(tmpArray);
    }

    async create(object){

        object['id'] = await Util.randomString(20);

        let collectionFile = this._config.data.path.concat('/').concat(this._name).concat('.data');
        let cache = this._config.data.cache;

        if(cache.has(this._name)){
            cache.get(this._name).push(object);
        }else{

            let data = [];

            try{
                let buffer = await fs.readFile(collectionFile);
                data = deserialize(buffer);
            }catch(e){}

            data.push(object);
            cache.set(this._name, data);
        }

        try{
            await fs.writeFile(collectionFile, serialize(cache.get(this._name))); 
        }catch(e){
        }

        return object['id'];
    }

    async update(id, object){

        let collectionFile = this._config.data.path.concat('/').concat(this._name).concat('.data');
        let cache = this._config.data.cache;
        let data = [];

        if(cache.has(this._name)){
            data = cache.get(this._name);
        }else{

            try{
                let buffer = await fs.readFile(collectionFile);
                data = deserialize(buffer);
            }catch(e){}

            cache.set(this._name, data);
        }

        for(let row of data){
            if(row.id == id){
                Object.assign(row, object);
                break;
            }
        }

        try{
            await fs.writeFile(collectionFile, serialize(cache.get(this._name))); 
            return true;
        }catch(e){}

        return false;
    }

    _getObjectValue(props, row){
        let property = props.reverse().pop();

        if(row[property]){
            let value = row[property];

            if(value instanceof Object){
                return this._getObjectValue(props.reverse(), value);
            }
            return value;
        } 
        return row;
    }
}

module.exports = Collection;