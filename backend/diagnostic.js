const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'diagnostic_log.txt');

try {
    fs.writeFileSync(logFile, 'Diagnostic started at ' + new Date().toISOString() + '\n');
    console.log('Console log test');
    fs.appendFileSync(logFile, 'File write successful.\n');
} catch (e) {
    console.error('Error writing file:', e);
}
