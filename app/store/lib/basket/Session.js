const Item = req('app.store.lib.basket.Item');

class Session{

    constructor(config, request, response, db, models){

        this._config = config;
        this._request = request;
        this._response = response;
        this._db = db;
        this._productModel = req(models.get('product'));;
        this._session = [];

        if(request.cookies().has(config.name)){
            try{
                this._session = JSON.parse(request.cookies().get(config.name));
            }catch(e){}
        }
    }

    async refresh(){

        let cartItemIds = this._session.map(i => { return i.id });
        
        let products = await this._db.collection('products')
            .where('id', 'in', cartItemIds)
            .get();

        for(let product of products){

            for(let i=0; i < this._session.length; i++){

                if(this._session[i].id == product.id){
                    this._session[i] = new Item(new this._productModel(product), this._session[i].quantity);
                    break;
                }
            }
        }
        console.log(this._session);
    }

    add(item){
        let found = false;

        for(let cartItem of this._session){ 
            if(cartItem.id == item.id){
                cartItem.quantity += item.quantity;
                found = true;
                break;
            }
        }

        if(!found){
            this._session.push(item);
        }
    }

    save(){
        // this._response.cookies().set(this._config.name, {
        //     secure : this._config.secure,
        //     samesite : this._config.samesite,
        //     path : '/',
        //     value : JSON.stringify(this._session)
        // });
    }
}

module.exports = Session; 