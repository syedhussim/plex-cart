
const fs = require('fs/promises');
const { type } = require('os');
const { serialize, deserialize } = require("v8");
const Util = require('../../Util');
const Result = require('./Result');

class Collection{

    constructor(settings, name){
        this._settings = settings;
        this._name = name;
        this._filters = [];
        this._sort = null;
        this._limit = null;
        this._offset = 0;
        this._cachePrefix = '_db_';
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

    limit(limit, offset = 0){
        this._limit = limit;
        this._offset = offset;
        return this;
    }

    async get(){
        let cacheStorage = this._settings.cacheStorage;
        let data = [];

        if(cacheStorage.has(this._cachePrefix + this._name)){
            data = cacheStorage.get(this._cachePrefix + this._name);
        }else{
            try{
                let collectionFile = this._settings.path.concat('/').concat(this._name).concat('.data');
                let buffer = await fs.readFile(collectionFile);

                data = deserialize(buffer);

                if(this._settings.cache){
                    cacheStorage.set(this._cachePrefix + this._name, data);
                }
            }catch(e){}
        }

        let tmpArray = [];
        let count = 0;

        for(let idx = this._offset; idx < data.length; idx++){

            let row = data[idx];

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

            if(this._limit == count){
                break;
            }

            if(this._filters.length == 0){
                tmpArray.push(row);
            }

            count++;
        }

        if(this._sort){
            tmpArray = tmpArray.sort((a, b) => {
                
                let v1 = this._getObjectValue(this._sort.property.split('.'), a);
                let v2 = this._getObjectValue(this._sort.property.split('.'), b);

                if(this._sort.direction == 'ASC'){
                    
                    if(typeof v1 == 'number'){
                        return v1 - v2;
                    }
    
                    if(typeof v1 == 'string'){
                        v1.localeCompare(v2);
                    }
                }else{
                    if(typeof v1 == 'number'){
                        return v2 - v1;
                    }
    
                    if(typeof v1 == 'string'){
                        return v2.localeCompare(v1);
                    }
                }
            });
        }

        data = null;
        return new Result(tmpArray);
    }

    async find(id, defaultVal = null){
        let result = await this.where('id', 'eq', id).get();

        if(!result.empty()){
            return result.first();
        }

        if(defaultVal){
            return defaultVal;
        }

        return false;
    }

    async create(object){

        let timeStamp = new Date().getTime();

        object['id'] = await Util.randomString(20);
        object['created_time'] = timeStamp;
        object['updated_time'] = timeStamp;

        let collectionFile = this._settings.path.concat('/').concat(this._name).concat('.data');
        let cacheStorage = this._settings.cacheStorage;

        let data = [];

        if(cacheStorage.has(this._cachePrefix + this._name)){
            data = cacheStorage.get(this._cachePrefix + this._name);
            data.push(object);
        }else{

            try{
                let buffer = await fs.readFile(collectionFile);
                data = deserialize(buffer);
            }catch(e){}

            data.push(object);

            if(this._settings.cache){
                cacheStorage.set(this._cachePrefix + this._name, data);
            }
        }

        try{
            await fs.writeFile(collectionFile, serialize(data)); 
        }catch(e){ 
            return {
                success : false
            }
        }

        return {
            id : object['id'],
            success : true
        }
    }

    async update(id, object){

        object['id'] = id;

        let collectionFile = this._settings.path.concat('/').concat(this._name).concat('.data');
        let cacheStorage = this._settings.cacheStorage;
        let data = [];

        if(cacheStorage.has(this._cachePrefix + this._name)){
            data = cacheStorage.get(this._cachePrefix + this._name);
        }else{

            try{
                let buffer = await fs.readFile(collectionFile);
                data = deserialize(buffer);
            }catch(e){}

            if(this._settings.cache){
                cacheStorage.set(this._cachePrefix + this._name, data);
            }
        } 

        let updated = false;

        for(let row of data){
            if(row.id == id){
                object['updated_time'] = new Date().getTime();
                Object.assign(row, object);
                updated = true;
                break;
            }
        }

        try{
            if(updated){
                await fs.writeFile(collectionFile, serialize(data)); 

                return {
                    success : true
                };
            }
        }catch(e){}

        return {
            success : false
        };
    }

    async delete(id){

        let property = 'id';
        let value = id;

        if(id instanceof Object){
            property = id.property;
            value = id.value;
        }

        let collectionFile = this._settings.path.concat('/').concat(this._name).concat('.data');
        let cacheStorage = this._settings.cacheStorage;
        let data = [];

        if(cacheStorage.has(this._cachePrefix + this._name)){
            data = cacheStorage.get(this._cachePrefix + this._name);
        }else{

            try{
                let buffer = await fs.readFile(collectionFile);
                data = deserialize(buffer);
            }catch(e){}

            if(this._settings.cache){
                cacheStorage.set(this._cachePrefix + this._name, data);
            }
        } 

        let updated = false;

        for(let i=0; i < data.length; i++){

            let row = data[i];

            if(row[property] == value){
                data.splice(i, 1);
                i--;
                updated = true;

                if(property == 'id'){
                    break;
                }
            }
        } 

        try{
            if(updated){
                await fs.writeFile(collectionFile, serialize(data)); 

                return {
                    success : true
                };
            }
        }catch(e){}

        return {
            success : false
        };
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