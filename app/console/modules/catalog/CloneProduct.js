const Util = req('core.Util');
const Validation = req('core.Validation');
const ConsoleController = req('app.console.lib.ConsoleController');

class CloneProduct extends ConsoleController{
 
    async post(){

        let post = this.request.post();

        if(post.has('id')){
            let id = post.get('id');

            let productsRes = await this.db.collection('products')
                .where('id', 'eq', id)
                .get();

            if(!productsRes.empty()){
                let product = productsRes.first();

                product.name += ' ( Cloned @ ' + new Date().getTime() + ' )';

                let result = await this.db.collection('products').create(product);

                this.request.flash({
                    message : `Successfully cloned ${product.name}`,
                    success : result.success,
                });

                return result;
            }
        }

        return {
            success : false
        };
    }
}

module.exports = CloneProduct;