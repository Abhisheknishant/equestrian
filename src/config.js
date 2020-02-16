const config = require('./default-config');

if (process.env.EQUESTRIAN_CONFIG) {
    Object.assign(config, require(`${__dirname}/../${process.env.EQUESTRIAN_CONFIG}`));
}

module.exports = config;
