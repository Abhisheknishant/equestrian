function read(input) {
    return new Promise(function(resolve, reject) {
        const parts = [];
        input.on('data', part => parts.push(part));
        input.on('error', reject);
        input.on('end', () => {
            resolve(Buffer.concat(parts));
        })
    });
}

module.exports = read;
