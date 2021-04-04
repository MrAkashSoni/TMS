const fs = require('fs');
const { ErrorHandler } = require('./error');

exports.getfilePath = (file) => {
    let dir;
    let parentDir;
    let rootDir;

    if (file.length === undefined) {
        rootDir = file.destination.split('/')[1];
        parentDir = file.destination.split('/')[2];
        dir = file.destination.split('/')[3];
        const fileName = `${rootDir}/${parentDir}/${dir}/${file.filename}`;
        return fileName;
    } else {
        const fileName = [];
        for (let i = 0; i < file.length; i++) {
            const element = file[i];
            rootDir = element.destination.split('/')[1];
            parentDir = element.destination.split('/')[2];
            dir = element.destination.split('/')[3];
            fileName.push(`${rootDir}/${parentDir}/${dir}/${element.filename}`);
        }
        return fileName;
    }
};

exports.checkFile = (req, fileName) => {
    if (req.fileValidationError) {
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }

        throw new ErrorHandler(400, req.fileValidationError);
    }
};

exports.removeExisting = (old_images) => {
    old_images.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
};
