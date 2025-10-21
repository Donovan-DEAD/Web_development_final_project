/**
 * @file blogs_middleware.js
 * @description This file contains the middlewares for the blogs routes.
 * @module routes/middlewares/blogs_middleware
 * 
 * @requires ../models/user
 * 
 * @exports authenticated
 * @exports hasEditorPerms
 */

// Import the necessary modules
const User = require("../models/user")

/**
 * @name authenticated
 * @description This middleware checks if the user is authenticated.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware.
 * @returns {void}
 * @redirects /login
 */
const authenticated = (req, res, next)=>{
    if(!req.isAuthenticated()) res.redirect("/login")
    else next();
}

/**
 * @name hasEditorPerms
 * @description This middleware checks if the user has editor permissions.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware.
 * @returns {void}
 * @redirects /
 */
const hasEditorPerms = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if(!user) res.redirect("/")

    if(user.perms == process.env.EDITOR_PERM_STR || user.perms == process.env.ADMIN_PERM_STR) next()
    else res.redirect("/")
}

module.exports = {
    authenticated,
    hasEditorPerms
}