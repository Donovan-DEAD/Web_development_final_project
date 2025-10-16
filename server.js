const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const { InitializeDbConnection } = require('./routes/utils');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./routes/models/user');

const { InitializeGeminiClient } = require('./routes/geminiApi');

dotenv.config();

async function startServer() {
    await InitializeDbConnection();
    await InitializeGeminiClient();

    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const apiRouter = require('./routes/api')(passport);
    const aiRouter = require('./routes/ai_router');

    // API router
    app.use('/api', apiRouter);
    app.use('/api/ia', aiRouter);

    // Set the view engine to ejs
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Define a route for the main page
    app.get('/', (req, res) => {
        res.render('index', { username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    // Define a route for the blogpost page
    app.get('/blogpost', (req, res) => {
        res.render('blogpost-template', { username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    // Define a route for the IA assistance page
    app.get('/ia-assistance', (req, res) => {
        res.render('ia_assistance', { username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    // Define a route for the IA response page
    app.get('/ia-response', (req, res) => {
        const apiResponse = req.session.apiResponse;
        req.session.apiResponse = null;
        res.render('ia_response', { ...apiResponse, username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    // Define a route for the login page
    app.get('/login', (req, res) => {
        const message = req.session.redirectInfo;
        req.session.redirectInfo = null;
        res.render('login', { username: req.user ? req.user.name.split(" ")[0] : null, current_page: 'login', message: message });
    });

    // Define a route for the register page
    app.get('/register', (req, res) => {
        const message = req.session.redirectInfo;
        req.session.redirectInfo = null;
        res.render('register', { username: req.user ? req.user.name.split(" ")[0] : null, current_page: 'register', message: message });
    });

    // Define a route for the blog search page
    app.get('/blog-search', (req, res) => {
        res.render('blog_search', { username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
