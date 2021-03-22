const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: { type: String },
    password: { type: String },
    role: { type: String },
}, {
    timestamps: true,
});

const authModel = mongoose.model('authModel', authSchema);
module.exports = authModel;
