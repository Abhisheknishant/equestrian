const config = require('./default-config');

if (process.env.EQUESTRIAN_CONFIG) {
    Object.assign(config, require(process.env.EQUESTRIAN_CONFIG));
}

module.exports = config;
