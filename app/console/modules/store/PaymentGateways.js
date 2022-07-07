const ConsoleController = req('app.console.lib.ConsoleController');

class PaymentGateways extends ConsoleController{

    async get(){

        let paymentGatewayRes = await this.db.collection('payment_gateways')
            .get();

        return await this.view.render('store/payment_gateways',{
            paymentGateways : paymentGatewayRes
        });
    }

    async getx(){

        await this.db.collection('payment_gateways')
            .create({
                active : false,
                name : 'PayPal Express Checkout',
                properties : [
                    {
                        name : 'Username',
                        property : 'username',
                        value : ''
                    },
                    {
                        name : 'Password',
                        property : 'password',
                        value : ''
                    },
                    {
                        name : 'Signature',
                        property : 'signature',
                        value : ''
                    }
                ]
            });

        await this.db.collection('payment_gateways')
            .create({
                active : false,
                name : 'Stripe',
                properties : [
                    {
                        name : 'API Key',
                        property : 'api_key',
                        value : ''
                    }
                ]
            });

        return await this.view.render('store/payment_gateways',{
            
        });
    }
}

module.exports = PaymentGateways;