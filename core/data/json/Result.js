class Result{

    constructor(data = []){
        this._data = data;
        this._index = -1;
    }

    empty(){
        if(this._data.length == 0){
            return true;
        }
        return false;
    }

    first(){
        if(this._data.length > 0){
            return this._data[0];
        }
        return {};
    }

    firstOrDefault(defaultValue){
        if(this._data.length > 0){
            return this._data[0];
        }
        return defaultValue;
    }

    next(){
        this._index++;
        if(this._data[this._index]){
            return this._data[this._index];
        }
        return false;
    }

    select(property){
        let array = [];
        for(let row of this._data){
            array.push(this._getObjectValue(property.split('.'), row));
        }
        return array;
    }

    toArray(){
        return this._data;
    }

    join(result, property, joinProperty, select = []){

        let array = [];

        for(let row of this._data){

            let found = false;

            for(let relatedRow of result){
                if(row[property] == relatedRow[joinProperty]){
                    delete relatedRow.id;

                    if(select.length > 0){
                        let tmpObj = {};

                        for(let selectProperty of select){
                            tmpObj[selectProperty] = relatedRow[selectProperty];
                        }

                        relatedRow = tmpObj;
                    }
                    row = Object.assign(row, relatedRow);
                    array.push(row);
                    found = true;
                    break;
                }
            }
            if(found == false){
                array.push(row);
            }
        }
        return new Result(array);
    }

    fullJoin(result, property, joinProperty, select = []){
        let array = [];
        
        for(let row of this._data){
            for(let relatedRow of result){
                if(row[property] == relatedRow[joinProperty]){
                    delete relatedRow.id;

                    if(select.length > 0){
                        let tmpObj = {};

                        for(let selectProperty of select){
                            tmpObj[selectProperty] = relatedRow[selectProperty];
                        }

                        relatedRow = tmpObj;
                    }
                    row = Object.assign(row, relatedRow);
                    array.push(row);
                    break;
                }
            }
        }
        return new Result(array);
    }

    *[Symbol.iterator](){
        for(let row of this._data){
            yield row;
        }
    }

    _getObjectValue(props, row){
        let property = props.reverse().pop();

        if(row.hasOwnProperty(property)){
            let value = row[property];

            if(value instanceof Object){
                return this._getObjectValue(props.reverse(), value);
            }
            return value;
        } 
        return row;
    }
}

module.exports = Result;