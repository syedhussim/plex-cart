const fs = require('fs/promises');
const path = require('path');
const WebRequest = require('../../core/WebRequest');

const root = path.resolve() + '/app/front/templates/pb';

async function sync(){

    await readDir(root);
}

async function readDir(path){

    let files = await fs.readdir(path, { 
        withFileTypes: true
    });
    
    for(let entry of files){

        if(entry.isDirectory()){
            await readDir(path + '/' + entry.name);
        }else{

            let data = await fs.readFile(path + '/' + entry.name);

            let options = {
                hostname : '127.0.0.1',
                port : 9093,
                path : '/upload/file',
                method : 'POST',
                headers: { 
                    'User-Agent': 'Mozilla/5.0', 
                    'Content-Type' : 'application/json'
                }
            };

            let response = await WebRequest.request(options, JSON.stringify({
                path : path.replace(root, ''),
                file : entry.name,
                data : data.toString('base64')
            }));

            console.log(path + '/' + entry.name + ' -> ' + response.statusCode)
        }
    }
}

sync();