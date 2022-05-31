const HttpController = req('core.http.HttpController');
const View = req('core.View');

class Products extends HttpController{

    async get(){
        let view = new View(this.rootDir + '/app/console/templates/omega/views/');

        return await view.render('catalog/products',{
            data :  [1,2,3,4],
            name : 'Syed'
        });
    }
}

module.exports = Products;