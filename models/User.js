// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'manager'], required: true },
    area: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
