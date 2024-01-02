// models/Area.js

const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    areaName: { type: String, unique: true, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Area', areaSchema);
