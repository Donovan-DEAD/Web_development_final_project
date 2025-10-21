const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const { InitializeDbConnection, VerifyRootUser } = require('./routes/utils/utils');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./routes/models/user');

const { InitializeGeminiClient } = require('./routes/utils/geminiApi');
const user = require('./routes/models/user');
const blog_id_and_desc = require('./routes/models/blod_ids_and_desc')
const { authenticated, hasAdminPerms } = require('./routes/middlewares/perms_middleware');
const { hasEditorPerms } = require('./routes/middlewares/blogs_middleware');

dotenv.config();

async function startServer() {
    await InitializeDbConnection();
    await InitializeGeminiClient();
    await VerifyRootUser();

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
    const blogRouter = require('./routes/blog_router');

    // API router
    app.use('/api', apiRouter);
    
    // Blog router
    app.use('/blog', blogRouter);

    // Set the view engine to ejs
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    //SampleData for the database (that will be in the final version)
    const sampleData = [
            {
                _id: '1',
                title: 'Riego con Drones',
                description: 'Una breve descripción sobre cómo los drones están revolucionando el riego en la agricultura.',
                image: '/images/riego-con-drones.jpg'
            },
            {
                _id: '2',
                title: 'Riego de Cultivo',
                description: 'Técnicas y mejores prácticas para el riego eficiente de cultivos a gran escala.',
                image: '/images/riego-de-cultivo.jpg'
            },
            {
                _id: '3',
                title: 'Tecnología en el Agro',
                description: 'Explorando las últimas innovaciones tecnológicas que están transformando la agricultura moderna.',
                image: '/images/bulb_icon.svg'
            },
            {
                _id: '4',
                title: 'Sostenibilidad Agrícola',
                description: 'Cómo las prácticas agrícolas sostenibles pueden beneficiar tanto al medio ambiente como a los agricultores.',
                image: '/images/camera_icon.svg'
            }
    ];

    //Get method for the search 
    app.get('/blog-search-results', async(req, res) => {
        if(!req.query.searchTerm) res.redirect('/blog-search')
        
        const searchTerm = req.query.searchTerm.trim().toLowerCase();
        const data = await blog_id_and_desc.find({title : { $regex : searchTerm, $options : 'i'}}).limit(15);

        if (!data || data.length === 0){
            return res.render('blog_search', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: '', data: []});
        }

        res.render('blog_search', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: '', data: data});
    });

    // Define a route for the main page
    app.get('/', (req, res) => {
        res.render('index', { user: req.user?req.user:null, username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });


    // Define a route for the IA assistance page
    app.get('/ia-assistance', (req, res) => {
        res.render('ia_assistance', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    // Define a route for the IA response page
    app.get('/ia-response', (req, res) => {
        const apiResponse = req.session.apiResponse;
        req.session.apiResponse = null;
        res.render('ia_response', { ...apiResponse, user : req.user?req.user:null , username: req.user ? req.user.name.split(" ")[0] : null, current_page: '' });
    });

    // Define a route for the login page
    app.get('/login', (req, res) => {
        const message = req.session.redirectInfo;
        req.session.redirectInfo = null;
        res.render('login', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: 'login', message: message });
    });

    // Define a route for the register page
    app.get('/register', (req, res) => {
        const message = req.session.redirectInfo;
        req.session.redirectInfo = null;
        res.render('register', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: 'register', message: message });
    });

    // Define a route for the blog search page
    app.get('/blog-search', async(req, res) => {
        const data = await blog_id_and_desc.find().limit(15);
        res.render('blog_search', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: '', data: data});
    });

    app.get('/create-blog', authenticated, hasEditorPerms, (req, res) => {
        res.render('create_blog', { user : req.user?req.user:null ,username: req.user ? req.user.name.split(" ")[0] : null, current_page: 'create_blog' });
    });


    app.get('/manage_perms',authenticated, hasAdminPerms, (req, res) => {
        const users = req.session.redirectInfo.users;
        const total_pages = req.session.redirectInfo.total_pages;
        const pagination_page = req.session.redirectInfo.pagination_page;
        
        const permsMap = {
            [process.env.ADMIN_PERM_STR]: 'admin',
            [process.env.USER_PERM_STR]: 'user',
            [process.env.EDITOR_PERM_STR]: 'editor'
        };
        
        users.forEach(u => {
            u.permsLabel = permsMap[u.perms] || 'desconocido';
            u.perms = u.permsLabel;
        });

        res.render('manage_perms', {
            user : req.user?req.user:null ,
            username: req.user ? req.user.name.split(" ")[0] : null,
            current_page: '',
            users: users,
            total_pages: total_pages,
            pagination_page: pagination_page
        })
    })

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
