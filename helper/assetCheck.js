const fs = require('fs');

if (!fs.existsSync('./logs/error.log')) {
    fs.openSync('./logs/error.log', 'w');
}

if (!fs.existsSync('./public/uploads/visitingCard')) {
    fs.mkdirSync('./public/uploads/visitingCard', {
        recursive: true,
    });
}

if (!fs.existsSync('./public/uploads/drivingLicence')) {
    fs.mkdir('./public/uploads/drivingLicence', {
        recursive: true,
    });
}
