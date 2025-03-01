const crypto = require('crypto');

// Generate a random 64-byte secret key and print it out as a hexadecimal string
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret); // This will output a random 64-byte secret key