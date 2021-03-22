const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transporterSchema = new Schema({
    transporter_first_name: { type: String },
    transporter_last_name: { type: String },
    transporter_mobile_number: { type: String },
    transporter_address: { type: Object },
    /*
    transporter_address_1: { type: String },
    transporter_address_2: { type: String },
    transporter_city: { type: String },
    transporter_state: { type: String },
    transporter_zip: { type: String },
    */
}, {
    timestamps: true,
});

const transporterModel = mongoose.model('transporterModel', transporterSchema);
module.exports = transporterModel;
