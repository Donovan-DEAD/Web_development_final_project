/**
 * @file perms_router.js
 * @description This file contains the routes for managing user permissions.
 * @module routes/perms_router
 * 
 * @requires ./utils/utils
 * @requires ./middlewares/perms_middleware
 * @requires express
 * @requires ./models/user
 * 
 * @exports module.exports
 */

// Import the necessary modules
const { ReturnPerms } = require('./utils/utils');
const { authenticated, hasAdminPerms } = require('./middlewares/perms_middleware');
const express = require('express');
const router = express.Router();
const User = require('./models/user');

/**
 * @function module.exports
 * @description This function returns the router for managing user permissions.
 * @param {object} passport - The passport object.
 * @returns {object} The router for managing user permissions.
 */
module.exports = function(passport) {
    /**
     * @name GET /users
     * @description This route returns the users to be displayed in the manage permissions page.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {void}
     * @redirects /manage_perms
     */
    router.get('/users',authenticated, hasAdminPerms, async(req, res) => {
        let pagination = parseInt(req.query.page);
        const field = req.query.filed;
        const query = req.query.query;

        let total = 0;

        if(field == undefined || query == undefined) total = await User.countDocuments();
        else total = await User.countDocuments({[field]: {$regex: query, $options: 'i'}});
    

        if(pagination == undefined || pagination < 1) {
            let users = null
            if(field == undefined || query == undefined) users = await User.find().select("-__v").limit(50);
            else users = await User.find({[field]: {$regex: query, $options: 'i'}}).select("-__v").limit(50);
        
            req.session.redirectInfo = {
                users : users,
                total_pages : Math.ceil(total/50),
                current_page : 1
            }

        } else {
            if(pagination > Math.ceil(total/50)) pagination = Math.ceil(total/50);

            let users = null

            if(field == undefined || query == undefined) users = await User.find().select("-__v").skip((pagination-1)*50).limit(50);
            else users = await User.find({[field]: {$regex: query, $options: 'i'}}).select("-__v").skip((pagination-1)*50).limit(50);
        
            req.session.redirectInfo = {
                users : users,
                total_pages : Math.ceil(total/50),
                pagination_page : pagination
            }
        }

        res.redirect("/manage_perms")
        
    });

    /**
     * @name POST /users
     * @description This route updates the permissions of a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {void}
     */
    router.post('/users',authenticated, hasAdminPerms, async (req, res) => {
        if(req.body.id == undefined || req.body.perm == undefined) res.sendStatus(400)

        const updateUser = await User.findByIdAndUpdate(req.body.id, {$set: {perms: ReturnPerms(req.body.perm)}, new: true, runValidators: true})
        res.json({
            email : updateUser.email,
            name : updateUser.name,
            perms : updateUser.permsLabel
        })

    });

    /**
     * @name DELETE /users
     * @description This route deletes a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {void}
     */
    router.delete('/users',authenticated, hasAdminPerms, async(req, res) => {
        if(req.body.id == undefined) res.sendStatus(400)

        const deleteUser = await User.findByIdAndDelete(req.body.id)
        res.sendStatus(200)
    });

    return router;
};