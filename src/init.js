const fs = require('./fs');
const config = require('./config');

async function init() {
    for(const name of ['DATA_ROOT']) {
        const pathname = config.env[name];
        if (!pathname) {
            throw new Error(`Variable ${name} not found`);
        }
        await fs.mkdirRecursive(pathname);
    }
}

module.exports = init;
