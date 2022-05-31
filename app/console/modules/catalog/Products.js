const HttpController = req('core.http.HttpController');

class Products extends HttpController{

    async get(){
        

        return await this.view.render('catalog/products',{
            data :  [1,2,3,4],
            name : 'Syed'
        });
    }
}

module.exports = Products;