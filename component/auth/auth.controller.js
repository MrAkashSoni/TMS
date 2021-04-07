const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../helper/error');
const logger = require('../../helper/logger');

const UserModel = require('../user/user.model');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const userDetail = await UserModel.findOne({ email });
        if (userDetail) {
            if (userDetail.is_user_verified) {
                const bcyptedPassword = userDetail.password;

                const compare = await bcrypt.compare(password, bcyptedPassword);

                if (compare) {
                    const token = jwt.sign({ _id: userDetail.email, role: userDetail.role }, process.env.TOKEN_SECRET);

                    res.status(200).json({ success: true, data: { userDetail, token } });
                } else {
                    throw new ErrorHandler(401, 'Invalid Credentials');
                }
            } else {
                res.status(209).json({ sucess: true, message: 'User is not verified' });
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

async function addUpdateUser(req, res, next) {
    try {
        const {
            first_name,
            last_name,
            primary_mobile_number,
            other_mobile_number,
            whatsapp_mobile_number,
            email,
            address_1,
            address_2,
            city,
            state,
            zip,
            own_trucks_by,
            name_of_service,
            role,
            password,
        } = req.body;

        let user;
        let bcyptedPassword;

        const foundUser = await UserModel.findOne({ primary_mobile_number }).lean();

        if (password) {
            const saltRounds = 10;
            bcyptedPassword = await bcrypt.hash(password, saltRounds);
        }

        const userDetail = {
            first_name,
            last_name,
            primary_mobile_number,
            other_mobile_number,
            whatsapp_mobile_number,
            email,
            living_address: {
                address_1,
                address_2,
                city,
                state,
                zip,
            },
            own_trucks_by,
            name_of_service,
            role,
            bcyptedPassword,
        };
        if (!foundUser) {
            user = await new UserModel(userDetail).save();

            res.status(200).json({ sucess: true, message: 'User Created.', data: user });
        } else if (foundUser.is_active) {
            user = await UserModel.findByIdAndUpdate({ _id: foundUser._id }, { $set: userDetail }, { new: true }).lean();

            res.status(200).json({ sucess: true, message: 'User Details Updated.', data: user });
        } else {
            throw new ErrorHandler(401, 'User is not active.');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    // registerUser,
    addUpdateUser,
};
