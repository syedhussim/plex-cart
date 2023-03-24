const HttpController = req('core.http.HttpController');
const Util = req('core.Util');

class Login extends HttpController{

    async get(){

        return await this.view.render('home/login',{
        });
    }

    async post(){

        let post = this.request.post();

        if(post.get('username') == this.config.auth.username && post.get('password') == this.config.auth.password){

            let sessionId = await Util.randomString(40);
            this.appStorage.set(this.config.session.name, sessionId);

            this.response.cookies().set(this.config.session.name, sessionId);
            this.response.redirect(`/content/pages`);
            return;
        }
            
        return await this.view.render('home/login',{
        });
    }
}

module.exports = Login;