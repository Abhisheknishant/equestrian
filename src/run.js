const child_process = require('child_process');

function exec(command, options = {}, getError = error => error) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, (error, stdout, stderr) => {
            const execError = getError(error, stdout, stderr);
            if (execError) {
                reject(execError);
            } else {
                resolve({ error, stdout, stderr });
            }
        });
    })
}

module.exports = { exec };
