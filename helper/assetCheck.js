const fs = require('fs');

if (!fs.existsSync('./logs/error.log')) {
    fs.openSync('./logs/error.log', 'w');
}
