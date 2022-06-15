class Response{
    constructor(response){
        this._response = response;
        this._httpCode = 200;
        this._headers = {};
        this._cookies = new Map();
        this._cookieOptions = {};
        this._output = '';
        this._flushed = false;
    }

    x(){ console.log(this._response.constructor.name)
        return this._response
    }

    httpCode(code){
        this._httpCode = code;
        return this;
    }

    cookieOptions(options = {}){
        this._cookieOptions = options;
    }

    cookies(){
        return this._cookies;
    }

    contentType(type){
        if(!this.hasHeader('Content-Type')){
            this.addHeader("Content-Type", type);
        }
        return this;
    }

    addHeader(header, value){
        this._headers[header] = value;
        return this;
    }

    hasHeader(header){
        if(this._headers.hasOwnProperty(header)){
            return true;
        }
        return false;
    }

    write(string){
        this._output = string;
        return this;
    }

    html(string, httpCode = null){
        if(httpCode){
            this.httpCode(httpCode);
        }
        this.contentType('text/html').write(string).flush();
    }

    flushed(){
        return this._flushed;
    }

    flush(){

        if(this._flushed){
            return;
        }

        let cookieHeader = '';

        for(let [cookieName, cookie] of this._cookies){

            let strCookieOptions = '';

            if(cookie instanceof Object){
                cookieHeader += `${cookieName}=${cookie.value};path=${cookie.path}; HttpOnly; SameSite=${cookie.samesite};${cookie.secure ? 'Secure' : ''};`;
            }else{
                cookieHeader += `${cookieName}=${cookie}`;
            }
        }

        if(cookieHeader){
            this.addHeader("Set-Cookie", cookieHeader);
        }

        if(this._redirectLocation){
            this.addHeader('Location', this._redirectLocation);
        }

        this._response.writeHead(this._httpCode, this._headers);
        this._response.end(this._output);
        this._flushed = true;
    }
}

module.exports = Response;