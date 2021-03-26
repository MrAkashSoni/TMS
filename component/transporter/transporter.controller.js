const { ErrorHandler } = require('../../helper/error');

const TransporterModel = require('./transporter.model');

async function addUpdateTransporter(req, res, next) {
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
        } = req.body;

        let transporter;

        const foundTransporter = await TransporterModel.findOne({ primary_mobile_number }).lean();
        const transporterDetail = {
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
        };
        if (!foundTransporter) {
            transporter = await new TransporterModel(transporterDetail).save().lean();

            res.status(200).json({ sucess: true, message: 'Transporter Created.', data: transporter });
        } else if (foundTransporter.is_active) {
            transporter = await TransporterModel.findByIdAndUpdate({ _id: foundTransporter._id }, { $set: transporterDetail }, { new: true }).lean();

            res.status(200).json({ sucess: true, message: 'Transporter Details Updated.', data: transporter });
        } else {
            throw new ErrorHandler(401, 'Transporter is not active.');
        }
    } catch (err) {
        next(err);
    }
}

async function activeTransporterToggle(req, res, next) {
    try {
        const { _id } = req.params;
        const foundTransporter = await TransporterModel.findById({ _id }).lean();
        if (foundTransporter) {
            const is_active = !foundTransporter.is_active;
            await TransporterModel.findByIdAndUpdate({ _id }, { $set: { is_active } }).lean();

            res.status(200).json({ sucess: true, message: 'Trasnporter active status updated' });
        } else {
            throw new ErrorHandler(404, 'Transporter not found');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addUpdateTransporter,
    activeTransporterToggle,
};
