/**
 * @file blod_ids_and_desc.js
 * @description This file contains the schema for the blog ids and descriptions.
 * @module routes/models/blod_ids_and_desc
 * 
 * @requires mongoose
 * 
 * @exports module.exports
 */

// Import the necessary modules
const mongoose = require('mongoose');

/**
 * @name blodIdsAndDescSchema
 * @description The schema for the blog ids and descriptions. This is use to make easier the pagination because mongo doesnt have the hability to make range queries so it needs to load all in memory first and then limit and skip in the results.
 * @type {mongoose.Schema}
 * 
 * @property {mongoose.Schema.Types.ObjectId} blog_id - The id of the original blog in the database.
 * @property {mongoose.Schema.Types.String} title - The title of the blog to appear in the card.
 * @property {mongoose.Schema.Types.String} description - The description of the blog a brief description of what is talking about the blog and is going to be put in the cards.
 * @property {mongoose.Schema.Types.String} img_url - The url of the image of the blog to appear in the card.
 * @property {mongoose.Schema.Types.Date} date - The date of the blog.
 */
const blodIdsAndDescSchema = new mongoose.Schema({
    blog_id: mongoose.Schema.Types.ObjectId,
    title: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    img_url: mongoose.Schema.Types.String,
    date: mongoose.Schema.Types.Date
});

module.exports = mongoose.model('BlodIdsAndDesc', blodIdsAndDescSchema);