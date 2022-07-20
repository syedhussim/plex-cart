class Session{

    constructor(config, request, response, db, models){

        this._config = config;
        this._request = request;
        this._response = response;
        this._db = db;
        this._productModel = req(models.get('product'));;
        this._session = { items : [], voucher :  '' };

        if(request.cookies().has(config.name)){
            try{
                this._session = JSON.parse(request.cookies().get(config.name));
            }catch(e){}
        }
    }

    async refresh(){

        this._subtotal = 0;
        this._discount = 0;
        this._total = 0;

        let cartItemIds = this._session.items.map(i => { return i.id });
        
        let products = await this._db.collection('products')
            .where('id', 'in', cartItemIds)
            .get();

        for(let product of products){

            for(let i=0; i < this._session.items.length; i++){

                if(this._session.items[i].id == product.id){

                    this._session.items[i].product = new this._productModel(product);
                    this._session.items[i].line_total = this._session.items[i].quantity * this._session.items[i].product.price;
                    
                    this._subtotal += this._session.items[i].line_total;
                    break;
                }
            }
        }

        this._total = this._subtotal - this._discount;
    }

    add(item){
        let found = false;

        for(let cartItem of this._session.items){ 
            if(cartItem.id == item.id){
                cartItem.quantity += item.quantity;
                found = true;
                break;
            }
        }

        if(!found){
            this._session.items.push(item);
        }

        this.save();
    }

    subtotal(){
        return this._subtotal;
    }

    discount(){
        return this._discount;
    }

    total(){
        return this._total;
    }

    save(){

        let data = {
            items : [],
            voucher : ''
        };

        for(let item of this._session.items){
            data.items.push({
                id : item.id,
                quantity : item.quantity
            });
        }

        this._response.cookies().set(this._config.name, {
            secure : this._config.secure,
            samesite : this._config.samesite,
            path : '/',
            value : JSON.stringify(data)
        });
    }

    *[Symbol.iterator](){
        for(let item of this._session.items){
            yield item;
        }
    }
}

module.exports = Session; 