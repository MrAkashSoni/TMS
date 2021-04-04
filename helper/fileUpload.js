const multer = require('multer');
const path = require('path');
const cryptoRandomString = require('crypto-random-string');

const destination = `${path.dirname(require.main.filename)}/public/uploads`;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${destination}/${file.fieldname}`);
    },
    filename(req, file, cb) {
        if (!file.originalname.includes('.')) {
            const ext = file.mimetype.split('/')[1];
            cb(null, `${Date.now()}_${cryptoRandomString({ length: 10, type: 'url-safe' })}.${ext}`);
        } else {
            cb(null, `${Date.now()}_${cryptoRandomString({ length: 10, type: 'url-safe' })}`);
        }
    },
});

const fileFilter = function (req, file, cb) {
    /* Accept images and docs only */
    if (!file.mimetype.match(/\/(image|jpg|JPG|jpeg|JPEG|png|PNG|heic|HEIC|mp4|avi|pdf|PDF|doc|DOC|docx|DOCX|xls|XLS|csv|CSV)$/)) {
        req.fileValidationError = 'Only (image|jpg|JPG|jpeg|JPEG|png|PNG|heic|HEIC|mp4|avi|pdf|PDF|doc|DOC|docx|DOCX|xls|XLS|csv|CSV) files are allowed!';
    }
    cb(null, true);
};

const fileUpload = multer({ storage, fileFilter });
module.exports = fileUpload;
