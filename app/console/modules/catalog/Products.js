const HttpController = req('core.http.HttpController');

class Products extends HttpController{

    async get(){
        return "Hello world"
    }
}

module.exports = Products;