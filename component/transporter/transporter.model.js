const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transporterSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    primary_mobile_number: { type: Number },
    other_mobile_number: { type: Array },
    whatsapp_mobile_number: { type: Array },
    email: { type: String },
    living_address: { type: Object },
    name_of_transportation: { type: String },
    own_trucks_by: { type: Boolean, default: false },
    total_deal_with_trasporter: { type: Number, default: 0 },
    likeness_to_work_with: { type: Number }, // 0-5 - 5 max 0 min
    is_active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const transporterModel = mongoose.model('transporterModel', transporterSchema);
module.exports = transporterModel;

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
