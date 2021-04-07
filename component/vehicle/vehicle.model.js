const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transporterSchema = new Schema({
    model_name: { type: String },
    company: { type: String },
    vehicle_type: { type: String },
    registration_number: { type: String },
    rc_card: { type: String },
    length_in_feet: { type: Array },
    height_in_feet: { type: String },
    capacity: { type: Number },
    wheels: { type: Number },
    owner_id: { type: String },
    vehicle_sub_type: { type: String },
    preffered_material: { type: Array },
    is_active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const transporterModel = mongoose.model('transporterModel', transporterSchema);
module.exports = transporterModel;
