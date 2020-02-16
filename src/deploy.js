// const config = require('./config');
const { exec } = require('./run')

// run promises sequentially
// const serial = funcs => funcs.reduce((promise, func) => promise.then(func), Promise.resolve());

async function deploy(scenario) {
    try {
        const script = [];
        for(const command of scenario.script) {
            script.push(await exec(command));
        }
        // const script = await serial((scenario.script || []).map(command => () => exec(command)));
        return { script };
    } catch (err) {
        console.error(err);
        return {
            error: {
                message: err || err.message
            }
        };
    }
}

module.exports = deploy;
