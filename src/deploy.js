const config = require('./config');
const { exec } = require('./run')
const { substituteSettings } = require('./substitute')

// run promises sequentially
// const serial = funcs => funcs.reduce((promise, func) => promise.then(func), Promise.resolve());

const shells = {
    sh: '/bin/sh',
    bash: '/bin/bash',
}

function processOptionsOf(scenario) {
    const env = substituteSettings(Object.assign(scenario.env, config.env), process.env);
    const options = {
        shell: shells.bash,
        env: {
            ...process.env,
            ...env,
            DEPLOY_REPOSITORY: config.repository.name,
            DEPLOY_REMOTE: config.repository.remote,
            DEPLOY_BRANCH: scenario.branch
        }
    };

    return options;
}

async function deploy(scenario) {
    try {
        const options = processOptionsOf(scenario);
        const script = [];
        // console.log(options);
        for(const command of scenario.script) {
            script.push(await exec(command, options));
        }
        return { script };
    } catch (err) {
        console.error(err);
        return {
            error: {
                message: err ? err.message : 'No error'
            }
        };
    }
}

module.exports = deploy;
