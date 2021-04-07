const { ErrorHandler } = require('../../helper/error');
const { getfilePath, checkFile, removeExisting } = require('../../helper/checkFile');

const VehicleModel = require('./vehicle.model');

async function addUpdateVehicle(req, res, next) {
    try {
        const {
            model_name,
            company,
            vehicle_type,
            registration_number,
            length_in_feet,
            height_in_feet,
            capacity,
            wheels,
            owner_id,
            vehicle_sub_type,
            preffered_material,
            old_rc_card,
        } = req.body;

        let vehicle;

        const file = req.file;
        const rc_card = await getfilePath(file);
        checkFile(req, rc_card);

        const foundVehicle = await VehicleModel.findOne({ registration_number }).lean();

        const userDetail = {
            model_name,
            company,
            vehicle_type,
            registration_number,
            rc_card,
            length_in_feet,
            height_in_feet,
            capacity,
            wheels,
            owner_id,
            vehicle_sub_type,
            preffered_material,
        };
        if (!foundVehicle) {
            vehicle = await new VehicleModel(userDetail).save();

            res.status(200).json({ sucess: true, message: 'Vehicle Created.', data: vehicle });
        } else if (foundVehicle.is_active) {
            vehicle = await VehicleModel.findByIdAndUpdate({ _id: foundVehicle._id }, { $set: userDetail }, { new: true }).lean();
            if (old_rc_card) removeExisting(old_rc_card);

            res.status(200).json({ sucess: true, message: 'Vehicle Details Updated.', data: vehicle });
        } else {
            throw new ErrorHandler(401, 'Vehicle is not active.');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addUpdateVehicle,
};
