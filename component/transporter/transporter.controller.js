const { ErrorHandler } = require('../../helper/error');
const TransporterModel = require('./transporter.model');

async function addTransporter(req, res, next) {
    try {
        const {
            transporter_first_name,
            transporter_last_name,
            transporter_mobile_number,
            transporter_address_1,
            transporter_address_2,
            transporter_city,
            transporter_state,
            transporter_zip,
        } = req.body;

        const findExisting = await TransporterModel.findOne({ transporter_mobile_number });
        if (!findExisting) {
            const addTransporter = new TransporterModel({
                transporter_first_name,
                transporter_last_name,
                transporter_mobile_number,
                transporter_address: {
                    transporter_address_1,
                    transporter_address_2,
                    transporter_city,
                    transporter_state,
                    transporter_zip,
                },
            });
            const newTransporter = await addTransporter;
            res.status(200).json({ sucess: true, data: newTransporter });
        } else {
            throw new ErrorHandler(409, 'Transporter already Exist.');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addTransporter,
};
