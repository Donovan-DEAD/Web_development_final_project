/**
 * @file img_technique.js
 * @description This file contains the schema for the image technique.
 * @module routes/models/img_technique
 * 
 * @requires mongoose
 * 
 * @exports module.exports
 */

// Import the necessary modules
const mongoose = require('mongoose');

/**
 * @name imgTechniqueSchema
 * @description The schema for the image technique.
 * @type {mongoose.Schema}
 * 
 * @property {mongoose.Schema.Types.String} technique_name - The name of the technique.
 * @property {Array<mongoose.Schema.Types.String>} images_urls - The urls of the images of the technique.
 * @property {mongoose.Schema.Types.String} explanation - The explanation of the technique.
 */
const imgTechniqueSchema = new mongoose.Schema({
    technique_name: mongoose.Schema.Types.String,
    images_urls: [mongoose.Schema.Types.String],
    explanation: mongoose.Schema.Types.String
});

module.exports = mongoose.model('ImgTechnique', imgTechniqueSchema);