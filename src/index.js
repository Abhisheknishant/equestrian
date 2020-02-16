const http = require('http');
const fs = require('fs');
const { getHookChanges } = require('./bitbucket-hooks');
const config = require('./config');
const deploy = require('./deploy');

const server = http.createServer((req, res) => {
    const parts = [];
    const respond = (status, data) => {
        res.writeHead(status, {
            'content-type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    };
    req.on('data', part => parts.push(part));
    req.on('end', () => {
        try {
            const data = JSON.parse(Buffer.concat(parts).toString('utf8'));
            const branches = getHookChanges(data, config.repository, data.hooks.map(hook => hook.branch));
            hooks.filter(hook === branches.include(hooks.branch)).forEach(deploy);
            respond(200, { ok: 1 });
        } catch (err) {
            respond(500, err.message);
        }
    })
    const filename = `/tmp/equestrian-${Date.now()}`;
    const file = fs.createWriteStream(filename);
    req.pipe(file);
    file.on('close', () => {
        getHookChanges();
        res.writeHead(203, {})
        res.end();
        console.log(`${req.method} ${req.url} ${filename}`);
    })
});

server.listen(config.port);
