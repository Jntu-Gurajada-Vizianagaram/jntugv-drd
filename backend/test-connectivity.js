const http = require('http');

function get(port, path) {
    const options = {
        hostname: '127.0.0.1',
        port: port,
        path: path,
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`Response from ${port}${path}: ${res.statusCode}`);
            console.log('Body:', data.substring(0, 500)); // First 500 chars
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request to ${port}: ${e.message}`);
    });

    req.end();
}

console.log("Testing Backend (6000)...");
get(6000, '/api/areas');

setTimeout(() => {
    console.log("Testing Frontend Proxy (3000)...");
    get(3000, '/api/areas');
}, 2000);
