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

    next(){
        this._index++;
        if(this._data[this._index]){
            return this._data[this._index];
        }
        return false;
    }

    toArray(){
        return this._data;
    }

    *[Symbol.iterator](){
        for(let row of this._data){
            yield row;
        }
    }
}

module.exports = Result;