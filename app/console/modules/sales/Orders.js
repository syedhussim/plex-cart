const ConsoleController = req('app.console.lib.ConsoleController');
const WebRequest = req('core.WebRequest');

class Orders extends ConsoleController{

    async get(){

        const options = {
            host: 'api.stripe.com',
            port: 443,
            path: `/v1/payment_intents/search?query=` + encodeURIComponent("status:'succeeded'"),
            method: 'GET',
            headers: {
                Authorization: `Bearer sk_test_51LNfzlBkHxUOkG9VMDcEEq6YTb9j7iMd4MRkSmvqasSWGmBynf5K6r2PZ16tfcK5xJB9cfuo1HtovpX3ei03vao400qV7Gf5Wn`,
            },
        };
       let x = await WebRequest.get(options);
       let payments = JSON.parse(x.data);
console.log(x);
       for(let p of payments.data){
           console.log(p.amount)
       }
      // console.log(x);
    }

}

module.exports = Orders;