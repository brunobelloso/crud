// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'manager'], default: 'user' }, // Assuming roles are either 'admin' or 'user'
    area: String
});

module.exports = mongoose.model('User', userSchema);
