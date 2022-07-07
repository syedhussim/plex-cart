const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class ManagePaymentGateway extends ConsoleController{

    async get(id, paymentGateway = null, errors = new Validation.ValidatorErrors()){

        if(!paymentGateway){
            let paymentGatewayRes = await this.db.collection('payment_gateways')
                .where('id', 'eq', id)
                .get();

            if(!paymentGatewayRes.empty()){
                paymentGateway = paymentGatewayRes.first();
            }
        }

        return await this.view.render('store/payment_gateway',{
            paymentGateway : paymentGateway,
            errors : errors
        });
    }

    async post(id){

        let paymentGatewayRes = await this.db.collection('payment_gateways')
            .where('id', 'eq', id)
            .get();

            if(!paymentGatewayRes.empty()){

                let post = this.request.post();

                let paymentGateway = paymentGatewayRes.first();

                paymentGateway.active = post.getInt('active');

                let validator = new Validation.Validator();

                for(let property of paymentGateway.properties){

                    validator.add(property.property, post.get(property.property), [
                        new Validation.Required(`${property.name} is required`),
                        new Validation.MaxLength(250, `${property.name} must not exceed @length characters`)
                    ]);

                    property.value = post.get(property.property);
                }

                if(validator.isValid()){
                    let result = await this.db.collection('payment_gateways')
                        .update(paymentGateway.id, paymentGateway);
console.log(paymentGateway);
                    this.request.flash({
                        success : result.success,
                        message : `Settings for ${paymentGateway.name} have been updated.`,
                    });
                }

                return await this.get(id, paymentGateway, validator.errors())

            }
    }
}

module.exports = ManagePaymentGateway;