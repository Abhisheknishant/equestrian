const http = require('http');
const { getHookChanges } = require('./bitbucket-hooks');
const config = require('./config');
const deploy = require('./deploy');
const read = require('./read');

function log(...args) {
    console.log([new Date().toLocaleTimeString(), ...args].join(' '));
}

const server = http.createServer(async (req, res) => {
    const respond = (status, data) => {
        res.writeHead(status, config.headers);
        res.write(JSON.stringify(data));
        res.end();
    };
    try {
        const buffer = await read(req);
        const data = JSON.parse(buffer.toString('utf8'));
        const branches = getHookChanges(data, config.repository, config.scenarios.map(scenario => scenario.branch));
        log('start', `branches:${branches.join(',')}`);
        const promises = config.scenarios.filter(scenario => branches.includes(scenario.branch))
            .map(async scenario => {
                const start = new Date();
                const report = await deploy(scenario);
                const end = new Date();
                log('end', scenario.branch);
                return {
                    start: start.toISOString(),
                    end: end.toISOString(),
                    spend: (end.getTime() - start.getTime()) / 1000,
                    report
                }
            });
        const results = await Promise.all(promises);
        respond(200, { ok: 1, results });
    } catch(err) {
        console.error(err);
        respond(500, { ok: 0, message: err.message });
    }
});

if (config.scenarios && config.scenarios.length > 0) {
    server.listen(config.port, () => {
        console.log(`Listen http://localhost:${config.port}`);
    });    
} else {
    console.error('No scenarios found');
}
