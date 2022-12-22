class Page{

    constructor(data){
        Object.assign(this, data);

        for(let [property, value] of Object.entries(this.params)){

            let sections = value.split("\n").filter( i => { return i.trim() });

            if(sections.length > 1){
                this.params[property] = '';
                for(let section of sections){
                    this.params[property] += `<p>${section.trim()}</p>`;
                }
            }
        }
    }

    async init(db){}
}

module.exports = Page;