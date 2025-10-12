const mongoose = require('mongoose');

const imgTechniqueSchema = new mongoose.Schema({
    technique_name: mongoose.Schema.Types.String,
    images_urls: [mongoose.Schema.Types.String],
    explanation: mongoose.Schema.Types.String
});

module.exports = mongoose.model('ImgTechnique', imgTechniqueSchema);