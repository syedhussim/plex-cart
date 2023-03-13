class PageContent{

    constructor(data, relatedPages = []){
        this._data = data;
        this._relatedPages = relatedPages;
    }

    get(property){
        if(this._data.hasOwnProperty(property)){
            return this._data[property].value;
        }
        return '';
    }

    relatedPages(){
        return this._relatedPages;
    }
}

module.exports = PageContent