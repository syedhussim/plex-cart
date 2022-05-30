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