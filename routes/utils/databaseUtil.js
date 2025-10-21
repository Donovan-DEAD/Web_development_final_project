/**
 * @file databaseUtil.js
 * @description This file contains the utility functions for the database.
 * @module routes/utils/databaseUtil
 * 
 * @requires mongoose
 * @requires ../models/blog_content
 * @requires ../models/user
 * @requires ../models/blod_ids_and_desc
 * 
 * @exports populateDB
 */

// Import the necessary modules
const mongoose = require('mongoose');
const {BlockContent} = require('../models/blog_content');
const user = require('../models/user');
const {Blog_ids_and_desc} = require('../models/blod_ids_and_desc'); 


/**
 * @name populateDB
 * @description This function populates the database with a sample post.
 * @returns {void}
 */
exports.populateDB = async () => {
    const existingPost = await BlockContent.findOne({ blog_id: 1 });
    if (existingPost) {
        console.log('Sample post already exists');
        return;
    }

    const samplePost = new BlockContent({
        blog_id: 1,
        blog_blocks: [
            {
                type: 'header', // This 'type' field is what we'll use
                blog_title: 'My First Dynamic Post',
                blog_subtitle: 'A guide to EJS partials',
                blog_author: 'AI Assistant',
                blog_date: 'October 20, 2025'
            },
            {
                type: 'pure_content',
                blog_paragraphs: [
                    'This is the first paragraph. We are rendering this dynamically.',
                    'The key is to loop through the `blog_blocks` array and use the `type` property to include a specific partial file for each block. This keeps your main template clean.'
                ]
            },
            {
                type: 'pure_image',
                img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', // Example image
                img_footer: 'A laptop with code on the screen.'
            },
            {
                type: 'img_and_content',
                img_url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', // Example image
                img_footer: 'Another tech-related image.',
                blog_paragraphs: [
                    'Here is some text that should appear next to an image.',
                    'We can use CSS flexbox to control the orientation.'
                ],
                orientation: 'left' // 'left' means image on left, text on right
            },
            {
                type: 'references',
                blog_references: [
                    {
                        blog_reference_apa: 'Express.js. (2025). Using template engines.',
                        blog_reference_url: 'https://expressjs.com'
                    },
                    {
                        blog_reference_apa: 'EJS. (2025). EJS documentation.',
                        blog_reference_url: 'https://ejs.co'
                    }
                ]
            }
        ]
    });

    await samplePost.save();
    console.log('Sample Post created');
}