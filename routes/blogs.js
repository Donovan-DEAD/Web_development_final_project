const { ReturnPerms } = require('./utils/utils');
const { authenticated, hasEditorPerms } = require('./middlewares/blogs_middleware');
const express = require('express');
const router = express.Router();
const blog_ids_and_desc = require('./models/blod_ids_and_desc');
const {  BlockContent } = require('./models/blog_content');

const { uploadImageToSupabase, deleteImageFromSupabase } = require('./utils/utils');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function(passport) {

    router.post("/blog",authenticated, hasEditorPerms, async(req, res) =>{
        if(!req.body){
            res.sendStatus(400)
        }

        if(!req.body.content || !req.body.card ){
            res.sendStatus(400)
        }

        const blog_contet =  new BlockContent({
            author_id :  req.user._id,
            blog_blocks : req.body.content.blocks
        })

        const doc = await blog_contet.save()
        const blog_id = doc._id
        const today_string = new Date().toISOString().split('T')[0]

        const blog_card = new blog_ids_and_desc({
            blog_id : blog_id,
            title : req.body.card.title,
            description : req.body.card.description,
            img_url : req.body.card.img_url,
            date : today_string
        })

        await blog_card.save()
        res.redirect("/blog-search")
    })

    router.put("/blog",authenticated, hasEditorPerms, async(req, res) =>{
        if(!req.body){
            res.sendStatus(400)
        }

        const user_id = req.user._id
        const blog_content = await BlockContent.findById(req.body.blog_id)

        if(blog_content.author_id != user_id){
            res.sendStatus(403)
        }

        const doc =  await BlockContent.updateOne({_id : req.body.blog_id}, { $set : {blog_blocks : req.body.content.blocks}})
        res.sendStatus(200)
    })

    router.delete("/blog",authenticated, hasEditorPerms, async(req, res) =>{
        if(!req.body){
            res.sendStatus(400)
        }

        const user_id = req.user._id

        if(blog_content.author_id != user_id){
            res.sendStatus(403)
        }

        const blog_content = await BlockContent.findById(req.body.blog_id)

        await BlockContent.deleteOne({_id : req.body.blog_id})
        await blog_ids_and_desc.deleteOne({blog_id : req.body.blog_id})
        res.sendStatus(200)
    })

    router.post("/blog/images", authenticated, hasEditorPerms, upload.single('image'), async(req, res)=>{
        if(!req.file){
            res.sendStatus(400)
        }

        try {
            const publicUrl = await uploadImageToSupabase(req.file);
            res.status(200).json({ imageUrl: publicUrl });
        } catch (error) {
            res.sendStatus(500);
        }
    })

    router.delete("/blog/images", authenticated, hasEditorPerms, async(req, res) => {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.sendStatus(400);
        }

        try {
            await deleteImageFromSupabase(imageUrl);
            res.sendStatus(200);
        } catch (error) {
            console.error('Error deleting image:', error);
            res.sendStatus(500);
        }
    })

    return router;
}
