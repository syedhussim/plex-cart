class PageContent{

    constructor(data){
        this.data = data;
    }

    get(property){
        if(this.data.hasOwnProperty(property)){
            return this.data[property].value;
        }
        return '';
    }
}

module.exports = PageContent