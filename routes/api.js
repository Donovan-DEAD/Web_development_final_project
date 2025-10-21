/**
 * @file api.js
 * @description This file contains the main router of the application.
 * @module routes/api
 * 
 * @requires express
 * @requires passport
 * @requires ./models/user
 * @requires dotenv
 * 
 * @exports module.exports
 */

// Import the necessary modules
const express = require('express');
const router = express.Router();
const User = require('./models/user');

require('dotenv').config();

/**
 * @function module.exports
 * @description This function returns the main router of the application.
 * @param {object} passport - The passport object.
 * @returns {object} The main router of the application.
 */
module.exports = function(passport) {
    /**
     * @name POST /login
     * @description This route handles the login of the users.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @param {function} next - The next middleware.
     * @returns {void}
     * @redirects /
     * @redirects /login
     */
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                req.session.redirectInfo = 'An error occurred. Try again later.';
                return res.redirect('/login');
            }
            if (!user) {
                req.session.redirectInfo = 'User not found.';
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    req.session.redirectInfo = 'An error occurred.';
                    return res.redirect('/login');
                }
                return res.redirect('/');
            });
        })(req, res, next);
    });

    /**
     * @name POST /register
     * @description This route handles the registration of the users.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {void}
     * @redirects /
     * @redirects /register
     */
    router.post('/register', (req, res) => {
        const newUser = new User({ name: req.body.name, username: req.body.username, perms: process.env.USER_PERM_STR, email: req.body.username});
        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                req.session.redirectInfo = 'Email already registered.';
                return res.redirect('/register');
            }
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            });
        });
    });

    /**
     * @name GET /logout
     * @description This route handles the logout of the users.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {void}
     * @redirects /
     */
    router.get('/logout', (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

    // Import the routers
    const aiRouter = require('./ai_router');
    router.use('/ia', aiRouter);

    const permsRouter = require('./perms_router')(passport);
    router.use('/perms', permsRouter);

    const blogEditorRouter = require('./blogs')(passport)
    router.use('/blogs', blogEditorRouter)

    const blogRouter = require('./blog_router');
    router.use('/blog', blogRouter);

    return router;
};