const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helper/error');
require('dotenv').config();

exports.verify = function (req, res, callback) {
    const token = req.header('auth-token');
    if (!token) throw new ErrorHandler(401, 'Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified.admin) {
            req.user = verified;
            callback();
        } else {
            throw new ErrorHandler(401, 'Access Denied');
        }
        callback();
    } catch (err) {
        throw new ErrorHandler(401, 'Invalid Token');
    }
};

exports.verifyAdmin = function (req, res, callback) {
    const token = req.header('auth-token');
    if (!token) throw new ErrorHandler(401, 'Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.admin) {
            req.user = verified;
            callback();
        } else {
            throw new ErrorHandler(401, 'Access Denied');
        }
        callback();
    } catch (err) {
        throw new ErrorHandler(401, 'Invalid Token');
    }
};
