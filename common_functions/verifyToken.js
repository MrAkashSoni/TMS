const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helper/error');
require('dotenv').config();

exports.verify = async function (req, res, next) {
    const token = req.header('auth-token');
    try {
        if (token) {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            if (verified.role !== 0) {
                req.user = verified;
                next();
            } else {
                throw new ErrorHandler(401, 'Access Denied');
            }
        } else {
            throw new ErrorHandler(401, 'Token Required');
        }
    } catch (err) {
        next(err);
    }
};

exports.verifyAdmin = async function (req, res, next) {
    const token = req.header('auth-token');
    try {
        if (token) {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            if (verified.role === 0) {
                req.user = verified;
                next();
            } else {
                throw new ErrorHandler(401, 'Access Denied');
            }
        } else {
            throw new ErrorHandler(401, 'Token Required');
        }
    } catch (err) {
        next(err);
    }
};
