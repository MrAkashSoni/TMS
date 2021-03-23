const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transporterSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    mobile_number: { type: Number },
    whatsapp_mobile_number: { type: Number },
    email: { type: String },
    address: { type: Object },
    total_deal_with_trasporter: { type: Number, default: 0 },
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
*/
