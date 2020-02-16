const child_process = require('child_process');

function referencesOf(text, names = new Set()) {
    text.replace(NamedReferenceRegExp, (match, name) => {
        names.add(name);
        return match;
    });
    return names;
}

function exec(command, getError = error => error) {
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
