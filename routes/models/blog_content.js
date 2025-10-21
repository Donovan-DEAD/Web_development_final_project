/**
 * @file blog_content.js
 * @description This file contains the schemas for the blog content.
 * @module routes/models/blog_content
 * 
 * @requires mongoose
 * 
 * @exports BlockContent
 * @exports HeaderBlock
 * @exports PureImageBlock
 * @exports PureContentBlock
 * @exports ImgAndContentBlock
 * @exports ReferencesBlock
 */

// Import the necessary modules
const mongoose = require('mongoose');

/**
 * @name blockContentSchema
 * @description The schema for the block content.
 * @type {mongoose.Schema}
 * 
 * @property {mongoose.Schema.Types.Int32} blog_id - The id of the blog.
 * @property {mongoose.Schema.Types.String} author_id - The id of the author of the blog.
 * @property {Array<mongoose.Schema.Types.Mixed>} blog_blocks - The blocks of the blog to make it dinamic and make the content of the blogs can be personalized by each author.
 */
const blockContentSchema = new mongoose.Schema({
    blog_id: mongoose.Schema.Types.Int32,
    author_id: mongoose.Schema.Types.String,
    blog_blocks: [mongoose.Schema.Types.Mixed]
});

const BlockContent = mongoose.model('BlockContent', blockContentSchema);

/**
 * @name HeaderBlock
 * @description The schema for the header block.
 * @type {mongoose.Model}
 */
const HeaderBlock = BlockContent.discriminator('Header', new mongoose.Schema({
    blog_title: mongoose.Schema.Types.String,
    blog_subtitle: mongoose.Schema.Types.String,
    blog_author: mongoose.Schema.Types.String,
    blog_date: mongoose.Schema.Types.String
}));

/**
 * @name PureImageBlock
 * @description The schema for the pure image block.
 * @type {mongoose.Model}
 */
const PureImageBlock = BlockContent.discriminator('Pure_image', new mongoose.Schema({
    img_url: mongoose.Schema.Types.String,
    img_footer: mongoose.Schema.Types.String
}));

/**
 * @name PureContentBlock
 * @description The schema for the pure content block.
 * @type {mongoose.Model}
 */
const PureContentBlock = BlockContent.discriminator('Pure_content', new mongoose.Schema({
    blog_paragraphs: [mongoose.Schema.Types.String]
}));

/**
 * @name ImgAndContentBlock
 * @description The schema for the image and content block.
 * @type {mongoose.Model}
 */
const ImgAndContentBlock = BlockContent.discriminator('Img_and_content', new mongoose.Schema({
    img_url: mongoose.Schema.Types.String,
    img_footer: mongoose.Schema.Types.String,
    blog_paragraphs: [mongoose.Schema.Types.String],
    orientation: mongoose.Schema.Types.String
}));

/**
 * @name ReferencesBlock
 * @description The schema for the references block.
 * @type {mongoose.Model}
 */
const ReferencesBlock = BlockContent.discriminator('References', new mongoose.Schema({
    blog_references: [{
        blog_reference_apa: mongoose.Schema.Types.String,
        blog_reference_url: mongoose.Schema.Types.String
    }]
}));

module.exports = {
    BlockContent,
    HeaderBlock,
    PureImageBlock,
    PureContentBlock,
    ImgAndContentBlock,
    ReferencesBlock
};