// models/Url.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Url', urlSchema);