const StoreController = req('app.store.lib.controllers.StoreController');
const WebRequest = req('core.WebRequest');

class Shipping extends StoreController{

    async get(){
        
        return this.view.render('basket/shipping', {
        });
    }

    async post(){
        let post = this.request.post();


        const options = {
            host: 'api.stripe.com',
            port: 443,
            path: '/v1/checkout/sessions',
            method: 'POST',
            headers: {
                Authorization: `Bearer sk_test_51LNfzlBkHxUOkG9VMDcEEq6YTb9j7iMd4MRkSmvqasSWGmBynf5K6r2PZ16tfcK5xJB9cfuo1HtovpX3ei03vao400qV7Gf5Wn`,
            },
        };

        let data = {
            cancel_url : 'http://127.0.0.1/cancel',
            success_url : 'http://127.0.0.1/success_url',
            line_items : [],
            mode : 'payment'
        };

        for(let item of this.basket){
            data.line_items.push({
                currency : 'GBP',
                name : item.product.name,
                unit_amount : item.product.price.toString().replaceAll('.', ''),
                quantity : item.quantity
            });
        }


        let props = Object.keys(data);
        let str = '';

        for(let prop of props){
            if(!Array.isArray(data[prop])){
                str += `${prop}=${data[prop]}&`
            }
        }

        for(let i=0; i < data.line_items.length; i++){
                let item = data.line_items[i];   
                str += `line_items[${i}][price_data][currency]=${item.currency}&`;
                str += `line_items[${i}][price_data][unit_amount]=${item.unit_amount}&`;
                str += `line_items[${i}][price_data][product_data][name]=${item.name}&`;
                str += `line_items[${i}][quantity]=${item.quantity}&`;
            
        }

       let x = await WebRequest.post(options, str);
       console.log(str);
console.log(x);
       let response = JSON.parse(x.data);

       this.response.redirect(response.url);
    }
}

module.exports = Shipping; 