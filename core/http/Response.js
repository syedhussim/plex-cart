class Response{
    constructor(response){
        this._response = response;
        this._output = '';
    }

    write(string){
        this._output = string;
        return this;
    }

    flush(){
        this._response.end(this._output);
    }
}

module.exports = Response;