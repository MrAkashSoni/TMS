const { ErrorHandler } = require('../../helper/error');

const UserModel = require('./user.model');

async function activeUserToggle(req, res, next) {
    try {
        const { _id } = req.params;
        const foundUser = await UserModel.findById({ _id }).lean();
        if (foundUser) {
            const is_active = !foundUser.is_active;
            await UserModel.findByIdAndUpdate({ _id }, { $set: { is_active } }).lean();

            res.status(200).json({ sucess: true, message: 'User active status updated' });
        } else {
            throw new ErrorHandler(404, 'User not found');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    activeUserToggle,
};
