const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const branchSchema = new Schema({
    transporter_id: { type: String },
    primary_mobile_number: { type: Number },
    other_mobile_number: { type: Array },
    whatsapp_mobile_number: { type: Array },
    GST_no: { type: String },
    visiting_card: { type: String },
    panCard: { type: String },
    aadharCard: { type: Array },
    address: { type: Object },
    services: { type: Array },
    type_of_material: { type: Array },
    bank_detail: { type: Array },
    total_deal_with_branch: { type: Number, default: 0 },
    likeness_to_work_with: { type: Number }, // 0-5 - 5 max 0 min
    is_active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const branchModel = mongoose.model('branchModel', branchSchema);
module.exports = branchModel;

/* address object should contain
    transporter_address_1: { type: String },
    transporter_address_2: { type: String },
    transporter_city: { type: String },
    transporter_state: { type: String },
    transporter_zip: { type: Number },

    bank array : {
        Bank name
        A/c holder name
        Branch
        A/c No.
        IFSC code
    }
*/
