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

module.exports.url = function(string, prefix = null){
    let retString = ''; 
    let len = string.length;

    for(let i = 0; i < len; i++){
        let chCode = string[i].toLowerCase().charCodeAt();

        if(chCode == 32 || chCode == 45){
            if(retString[retString.length - 1] != '-'){
                retString += '-';
            }
        }
        
        if((chCode >= 48 && chCode <= 57) || (chCode >= 97 && chCode <= 122)){
            retString += string[i].toLowerCase();
        }
    }

    return prefix  ? '/' + prefix + '/' + retString : '/' + retString;
}

module.exports.isNumber = function(str){
    let regexp = /^\d+?$/;
    return regexp.test(str);
}

module.exports.isDecimal = function(str){
    let regexp = /^\d+(\.\d+)?$/;
    return regexp.test(str);
}

module.exports.tryParseFloat = function(str){
    if(this.isDecimal(str)){
        return parseFloat(str);
    }
    return str;
}