let config = require('./default-config');
const fs = require('./fs');
const { substituteSettings } = require('./substitute');

if (process.env.EQUESTRIAN_CONFIG) {
    const localConfig = require(`${__dirname}/../${process.env.EQUESTRIAN_CONFIG}`);
    config = {
        ...config,
        ...localConfig,
        env: {
            ...config.env,
            ...localConfig.env
        }
    }
}

config.env = substituteSettings(config.env, process.env);

module.exports = config;
