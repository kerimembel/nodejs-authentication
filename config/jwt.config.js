const fs = require('fs')
const path = require('path');
const { cwd } = require('process');

const privateKey = fs.readFileSync(path.join(cwd(), 'keys', 'file_upload_rsa'), 'utf8');
const publicKey = fs.readFileSync(path.join(cwd(), 'keys', 'file_upload_rsa.pub'), 'utf8');

module.exports.privateKey = privateKey;
module.exports.publicKey = publicKey;