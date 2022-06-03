const { parse } = require('querystring');

class Request{

    constructor(request){
        const protocol = request.socket.encrypted ? 'https' : 'http';
        this._request = request;
        this._url = new URL(protocol + '://' + request.headers.host + request.url);
        this._method = request.method;
        this._headers = new Map(Object.entries(request.headers));
        this._cookies = null;
        this._query = new URLSearchParams(this._url.search);
        this._post = null;

        if(this.headers().has('cookie')){
            this._cookies = this._parseCookies(this.headers().get('cookie'));
        }
    }
    
    async init(){
        if(this.method() !='GET'){
            try{
                let body = await this._parsePostBody();

                if(this.headers().has('content-type') && this.headers().get('content-type') == 'application/json'){

                    let post = {};
        
                    try{
                        post = body ? JSON.parse(body) : {}
                    }catch(e){}

                    this._post = new Post(post);
                }else{
                    this._post = new Post(parse(body));
                }
            }catch(e){ console.log(e)}
        }
    }

    url(){
        return this._url;
    }

    method(){
        return this._method;
    }

    cookies(){
        return this._cookies;
    }

    headers(){
        return this._headers;
    }

    query(){
        return this._query;
    }

    post(){
        return this._post;
    }

    _parseCookies(cookie){
        let cookies = new Map();

        if(cookie.length > 0){
            let cookieSections = cookie.split(';');

            for(let idx in cookieSections){
                let cookie = cookieSections[idx].split('=');
                cookies.set(cookie[0].trim(), cookie[1]);
            }
        }
        return cookies;
    }

    _parsePostBody(){
        return new Promise((resolve, reject) => {

            let body = '';

            this._request.on('data', data => {
                body += data.toString();
            });

            this._request.on('end', () => {
                resolve(body);
            });

            this._request.on('error', err => {
                reject(err);
            });
        });
    }
}

class Post{
    constructor(post){

        Object.assign(this, post);

        return new Proxy(this, {
            get: function(target, name) {
                return target.hasOwnProperty(name) ? target[name] : '';
            }
        }); 
    }
}

module.exports = Request;