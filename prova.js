const CryptoJS = require('crypto-js');

// let message = "ciao";

// let encryptMessage = CryptoJs.AES.encrypt(message, "hello").toString;
// console.log(encryptMessage);

// let decryptMessage = CryptoJs.AES.decrypt(encryptMessage, "hello").toString(CryptoJs.enc.Utf8);
// console.log(decryptMessage);

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'