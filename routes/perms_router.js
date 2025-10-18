import { hasAdminPerms, authenticated } from './middlewares/perms_middleware';
import { ReturnEquivalentStringPerm, ReturnPerms } from './utils/utils';

const express = require('express');
const router = express.Router();
const User = require('./models/user');

module.exports = function(passport) {
    router.get('/users',authenticated, hasAdminPerms, async(req, res) => {
        let pagination = parseInt(req.query.page);
        const field = req.query.filed;
        const query = req.query.query;

        let total = 0;

        if(field == undefined || query == undefined) total = await User.countDocuments();
        else total = await User.countDocuments({[field]: {$regex: query, $options: 'i'}});
    

        if(pagination == undefined || pagination < 1) {
            let users = null
            if(field == undefined || query == undefined) users = await User.find().select("-perms -__v").limit(50);
            else users = await User.find({[field]: {$regex: query, $options: 'i'}}).select("-perms -__v").limit(50);
        
            req.session.redirectInfo = {
                users : users,
                total_pages : Math.ceil(total/50),
                current_page : 1
            }

        } else {
            if(pagination > Math.ceil(total/50)) pagination = Math.ceil(total/50);

            let users = null

            if(field == undefined || query == undefined) users = await User.find().select("-perms -__v").skip((pagination-1)*50).limit(50);
            else users = await User.find({[field]: {$regex: query, $options: 'i'}}).select("-perms -__v").skip((pagination-1)*50).limit(50);
        
            req.session.redirectInfo = {
                users : users,
                total_pages : Math.ceil(total/50),
                current_page : pagination
            }
        }

        res.redirect("/manage_perms")
        
    });

    router.post('/users',authenticated, hasAdminPerms, async (req, res) => {
        if(req.body.id == undefined || req.body.perm == undefined) res.sendStatus(400)

        const updateUser = await User.findByIdAndUpdate(req.body.id, {$set: {perms: ReturnPerms(req.body.perm)}, new: true, runValidators: true})
        res.json({
            email : updateUser.email,
            name : updateUser.name,
            perms : updateUser.permsLabel
        })

    });

    router.delete('/users',authenticated, hasAdminPerms, async(req, res) => {
        if(req.body.id == undefined) res.sendStatus(400)

        const deleteUser = await User.findByIdAndDelete(req.body.id)
        res.sendStatus(200)
    });

    return router;
};