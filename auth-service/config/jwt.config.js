const fs = require('fs')
const path = require('path');
const { cwd } = require('process');

const privateKey = fs.readFileSync(path.join(cwd(), 'keys', 'jwtRS256.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(cwd(), 'keys', 'jwtRS256.key.pub'), 'utf8');

module.exports.privateKey = privateKey;
module.exports.publicKey = publicKey;