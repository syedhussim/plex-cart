class WebRequest{

    static async get(options){ 
        return WebRequest._request(options, null);
    }

    static async _request(options = {}, postData = null){

        let client = options.port == 443 ? require('https') : require('http');

        let response = await new Promise((resolve, reject) => {
            
            const req = client.request(options, (response) => {

                let chuncks = [];

                response.on('data', (data) => {
                    chuncks.push(data);
                });

                response.on('end', () => {
                    resolve({ 
                        statusCode: response.statusCode, 
                        headers : response.headers, 
                        data : Buffer.concat(chuncks).toString()
                    });
                });
            });

            req.on('error', function(err){
                reject(err);
            });

            if(postData){
                req.write(postData);
            }
            
            req.end();
        });

        return response;
    }
}

module.exports = WebRequest;