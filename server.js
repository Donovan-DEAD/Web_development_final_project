const dotenv = require('dotenv')
const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');

dotenv.config()

// API router
app.use('/api', apiRouter);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the main page
app.get('/', (req, res) => {
    res.render('index');
});

// Define a route for the blogpost page
app.get('/blogpost', (req, res) => {
    res.render('blogpost-template');
});

// Define a route for the IA assistance page
app.get('/ia-assistance', (req, res) => {
    res.render('ia_assistance');
});

// Define a route for the IA response page
app.get('/ia-response', (req, res) => {
    res.render('ia_response');
});

// Define a route for the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Define a route for the blog search page
app.get('/blog-search', (req, res) => {
    res.render('blog_search');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
