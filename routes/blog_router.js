const express = require('express');
const router = express.Router();
const { BlockContent } = require('./models/blog_content');

// Route to display a specific blog post
router.get('/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blogContent = await BlockContent.findOne({ blog_id: blogId });

        if (!blogContent) {
            return res.status(404).send('Blog post not found');
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
