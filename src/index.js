const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const filename = `/tmp/equestrian-${Date.now()}`;
    const file = fs.createWriteStream(filename);
    req.pipe(file);
    file.on('close', () => {
        res.write('{"ok": 1}');
        res.end();
        console.log(`${req.method} ${req.url} ${filename}`);
    })
});

server.listen(9000);
