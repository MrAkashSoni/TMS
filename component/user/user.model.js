const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    password: { type: String },
    primary_mobile_number: { type: Number },
    other_mobile_number: { type: Array },
    whatsapp_mobile_number: { type: Array },
    email: { type: String },
    living_address: { type: Object },
    name_of_service: { type: String },
    own_trucks_by: { type: Boolean, default: false },
    total_deal_with_user: { type: Number, default: 0 },
    likeness_to_work_with: { type: Number }, // 0-5 - 5 max 0 min
    is_active: { type: Boolean, default: true },
    role: { type: Number }, // 0 - admin, 1 - sub_admin, 2 - manager, 3 - transporter, 4 - vehicle_owner, 5 - driver
    is_user_verified: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
