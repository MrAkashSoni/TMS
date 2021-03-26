const { ErrorHandler } = require('../../helper/error');
const { getfilePath, checkFile, removeExisting } = require('../../helper/checkFile');

const BranchModel = require('./branch.model');

async function addUpdateBranch(req, res, next) {
    try {
        const {
            transporter_id,
            primary_mobile_number,
            other_mobile_number,
            whatsapp_mobile_number,
            email,
            GST_no,
            services,
            type_of_material,
            bank_name,
            bank_account_number,
            acc_holder_name,
            bank_branch,
            IFSC_code,
            address_1,
            address_2,
            city,
            state,
            zip,
        } = req.body;

        const file = req.file;
        const visiting_card = await getfilePath(file);
        checkFile(req, visiting_card);

        let branch;

        const foundBranch = await BranchModel.findOne({ primary_mobile_number }).lean();

        const branchDetail = {
            transporter_id,
            primary_mobile_number,
            other_mobile_number,
            whatsapp_mobile_number,
            email,
            GST_no,
            services,
            type_of_material,
            visiting_card,
            address: {
                address_1,
                address_2,
                city,
                state,
                zip,
            },
            bank_detail: {
                bank_name,
                bank_account_number,
                acc_holder_name,
                bank_branch,
                IFSC_code,
            },
        };

        if (!foundBranch) {
            branch = await new BranchModel(branchDetail).save();

            res.status(200).json({ sucess: true, message: 'Branch Created.', data: branch });
        } else if (foundBranch.is_active) {
            branch = await BranchModel.findByIdAndUpdate({ _id: foundBranch._id }, { $set: branchDetail }, { new: true }).lean();

            if (file) removeExisting(foundBranch.visiting_card);

            res.status(200).json({ sucess: true, message: 'Transporter Details Updated.', data: branch });
        } else {
            throw new ErrorHandler(401, 'Transporter is not active.');
        }
    } catch (err) {
        next(err);
    }
}

async function activeBranchToggle(req, res, next) {
    try {
        const { _id } = req.params;
        const foundTransporter = await BranchModel.findById({ _id }).lean();
        if (foundTransporter) {
            const is_active = !foundTransporter.is_active;
            await BranchModel.findByIdAndUpdate({ _id }, { $set: { is_active } }).lean();

            res.status(200).json({ sucess: true, message: 'Trasnporter active status updated' });
        } else {
            throw new ErrorHandler(404, 'Transporter not found');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addUpdateBranch,
    activeBranchToggle,
};
