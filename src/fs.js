const { promisify } = require('util');
const fs = require('fs');

const promisedFs = {
    mkdir: promisify(fs.mkdir),
    mkdirRecursive: path => promisify(fs.mkdir)(path, { recursive: true })
}

module.exports = promisedFs;
