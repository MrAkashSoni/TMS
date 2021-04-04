const multer = require('multer');
const path = require('path');
const cryptoRandomString = require('crypto-random-string');

const destination = `${path.dirname(require.main.filename)}/public/uploads`;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${destination}/${file.fieldname}`);
    },
    filename(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}_${cryptoRandomString({ length: 10, type: 'url-safe' })}.${ext}`);
    },
});

const fileFilter = function (req, file, cb) {
    /* Accept images and docs only */
    if (!file.mimetype.match(/\/(image|jpg|JPG|jpeg|JPEG|png|PNG|heic|HEIC)$/)) {
        req.fileValidationError = 'Only (image|jpg|JPG|jpeg|JPEG|png|PNG|heic|HEIC) files are allowed!';
    }
    cb(null, true);
};

const fileUpload = multer({ storage, fileFilter });
module.exports = fileUpload;
