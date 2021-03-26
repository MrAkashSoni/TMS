const fs = require('fs');
const { ErrorHandler } = require('./error');

exports.getfilePath = (file) => {
    const rootDir = file.destination.split('/')[1];
    const parentDir = file.destination.split('/')[2];
    const dir = file.destination.split('/')[3];
    const fileName = `${rootDir}/${parentDir}/${dir}/${file.filename}`;
    return fileName;
};

exports.checkFile = (req, fileName) => {
    if (req.fileValidationError) {
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }

        throw new ErrorHandler(400, req.fileValidationError);
    }
};

exports.removeExisting = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};
