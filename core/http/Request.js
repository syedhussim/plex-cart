class Request{

    constructor(request){
        const protocol = request.socket.encrypted ? 'https' : 'http';
        this._request = request;
        this._url = new URL(protocol + '://' + request.headers.host + request.url);
        this._method = request.method;
    }

    url(){
        return this._url;
    }

    method(){
        return this._method;
    }
}

module.exports = Request;