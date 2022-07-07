module.exports.randomString = async function(len){

    const crypto = require('crypto');
    const { promisify } = require('util')

    const randomBytes = promisify(crypto.randomBytes);

    const rand = await randomBytes(len);

    const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let key = '';

    for(let i=0; i < rand.length; i++){
        let idx = rand[i] % letters.length;
        key += letters[idx];
    }

    return key;
};

module.exports.url = function(str, prefix = '', suffix = ''){
    str = str.toLowerCase();
    let retString = '/'; 

    for(let i in str){
        let chCode = str[i].charCodeAt();

        if(chCode == 32 || chCode == 45){
            if(retString[retString.length - 1] != '-'){
                retString += '-';
            }
        }
        
        if((chCode >= 48 && chCode <= 57) || (chCode >= 97 && chCode <= 122)){
            retString += str[i];
        }
    }

    if(prefix){
        retString = '/' + prefix.toLowerCase() + retString;
    }

    if(suffix){
        retString = retString + '/' + suffix.toLowerCase();
    }

    return retString;
}

module.exports.isNumber = function(str){

    if(str.length == 0){
        return false;
    }

    for(let i in str.toString()){

        let ch =  str.toString().charCodeAt(i);

        if(ch < 48 || ch > 57){
            return false;
        }
    }
    return true;
}

module.exports.tryParseInt = function(str){   
    if(this.isNumber(str)){
        return parseFloat(str);
    }
    return str;
}

module.exports.isFloat = function(str){

    if(str.length == 0){
        return false;
    }

    let periodCounter = 0;

    for(let i in str.toString()){

        let ch =  str.toString().charCodeAt(i);

        if(ch < 46 || ch > 57){
            return false;
        }

        if(ch == 46){
            periodCounter++;

            if(periodCounter > 1){
                return false;
            }
        }

        if(ch == 47){
            return false;
        }
    }
    return true;
}

module.exports.tryParseFloat = function(str){
    if(this.isFloat(str)){
        return parseFloat(str);
    }
    return str;
}

module.exports.toImage = function(file, data){

    const fs = require('fs/promises');

    let segments = data.split(',');

    if(segments.length > 1){ 
        fs.writeFile(file, segments[1], 'base64');
    }
}