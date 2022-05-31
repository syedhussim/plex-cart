class Response{
    constructor(response){
        this._response = response;
        this._httpCode = 200;
        this._headers = {};
        this._cookies = [];
        this._cookieOptions = {};
        this._output = '';
        this._flushed = false;
    }

    httpCode(code){
        this._httpCode = code;
        return this;
    }

    cookieOptions(options = {}){
        this._cookieOptions = options;
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

    flushed(){
        return this._flushed;
    }

    flush(){

        if(this._flushed){
            return;
        }

        let cookieHeader = '';

        for(let i=0; i < this._cookies.length; i++){
            let { name, value, path } = this._cookies[i];
            
            path = (path == '') ? '/' : path;


            let strCookieOptions = "path=" + (this._cookieOptions.path || '/') + "; HttpOnly; SameSite=" + (this._cookieOptions.samesite || 'None') + ';';

            let cookieSecure = this._cookieOptions.secure || false;

            if(cookieSecure){
                strCookieOptions += 'Secure;';
            }
            
            cookieHeader += name + '=' + value + '; ' + strCookieOptions;
        }

        if(this._cookies.length > 0){
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