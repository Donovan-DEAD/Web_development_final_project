/**
 * @file perms_middleware.js
 * @description This file contains the middlewares for the permissions routes.
 * @module routes/middlewares/perms_middleware
 * 
 * @requires ../models/user
 * 
 * @exports authenticated
 * @exports hasAdminPerms
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
 * @name hasAdminPerms
 * @description This middleware checks if the user has admin permissions.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware.
 * @returns {void}
 * @redirects /
 */
const hasAdminPerms = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if(!user) res.redirect("/")

    if(user.perms == process.env.ADMIN_PERM_STR) next()
    else res.redirect("/")
}

module.exports = {
    authenticated,
    hasAdminPerms
}