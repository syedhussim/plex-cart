const HttpController = req('core.http.HttpController');

class ConsoleController extends HttpController{

    async authorize(){

        let session = this.config.session;

        if(session.dev){
            return true;
        }

        if(this.request.cookies().has(session.name)){
            let id = this.request.cookies().get(session.name);
            
            if(this.appStorage.has(id)){
                return true;
            }
        }

        this.response.html(await this.view.render('signin/index'));

        return false;
    }
}

module.exports = ConsoleController;