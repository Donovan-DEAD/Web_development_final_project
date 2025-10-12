const mongoose = require('mongoose');

const blodIdsAndDescSchema = new mongoose.Schema({
    blod_id: mongoose.Schema.Types.ObjectId,
    title: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    img_url: mongoose.Schema.Types.String,
    date: mongoose.Schema.Types.Date
});

module.exports = mongoose.model('BlodIdsAndDesc', blodIdsAndDescSchema);