const express = require('express');
const router = express.Router();
const User = require('./models/user');

require('dotenv').config();

module.exports = function(passport) {
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

    router.post('/register', (req, res) => {
        const newUser = new User({ name: req.body.name, username: req.body.username, perms: process.env.USER_PERM_STR });
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

    router.get('/logout', (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

    const aiRouter = require('./ai_router');
    router.use('/ia', aiRouter);

    const permsRouter = require('./perms_router')(passport);
    router.use('/perms', permsRouter);

    return router;
};