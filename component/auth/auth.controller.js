const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../helper/error');
const logger = require('../../helper/logger');

const AuthModel = require('./auth.model');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const userDetail = await AuthModel.findOne({ email });
        if (userDetail) {
            const bcyptedPassword = userDetail.password;

            const compare = await bcrypt.compare(password, bcyptedPassword);

            if (compare) {
                let is_admin = false;

                if (userDetail.role == 'admin') {
                    is_admin = true;
                }

                const token = jwt.sign({ _id: userDetail.email, admin: is_admin }, process.env.TOKEN_SECRET);

                res.status(200).json({ success: true, data: { userDetail, token } });
            } else {
                throw new ErrorHandler(401, 'Invalid Credentials');
            }
        } else {
            throw new ErrorHandler(404, 'User not found');
        }
        next();
    } catch (err) {
        logger.error(`${__filename} ${req.method} ${req.originalUrl}`, err);
        next(err);
    }
}

async function registerUser(req, res, next) {
    try {
        const { email, password, role } = req.body;
        const saltRounds = 10;
        const bcyptedPassword = await bcrypt.hash(password, saltRounds);

        const creatUser = new AuthModel({
            email,
            password: bcyptedPassword,
            role,
        });
        const newUser = await creatUser.save();

        res.status(200).json({ success: true, message: 'User Created.', data: newUser });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    registerUser,
};
