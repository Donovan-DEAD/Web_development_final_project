/**
 * @file blog_router.js
 * @description This file contains the routes for displaying a specific blog post.
 * @module routes/blog_router
 * 
 * @requires express
 * @requires ./models/blog_content
 * @requires mongoose
 * 
 * @exports router
 */

// Import the necessary modules
const express = require('express');
const router = express.Router();
const { BlockContent } = require('./models/blog_content');
const mongoose = require('mongoose');

/**
 * @name GET /:blogId
 * @description This route displays a specific blog post.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 * @render blogpost-template
 * @render 404
 */
router.get('/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blogContent = await BlockContent.findById({ _id: new mongoose.Types.ObjectId(blogId) });

        if (!blogContent) {
            return res.status(404).render('404', {
                user: req.user || null,
                username: req.user ? req.user.name.split(" ")[0] : null,
                current_page: ''
            });
        }

        res.render('blogpost-template', {
            user: req.user || null,
            username: req.user ? req.user.name.split(" ")[0] : null,
            current_page: 'blog',
            blog: blogContent
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
