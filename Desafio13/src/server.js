import express from 'express';
const app = express();
import * as Middlewares from './middlewares/auth.middleware.js';
import { cacheControl } from './middlewares/auth.middleware.js';
app.use(cacheControl)
import { fakerProds } from './utils/faker.js'
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
import session from 'express-session';
import handlebars from 'express-handlebars'
const port = 8080;
dotenv.config()
import passport from './utils/passport.utils.js';
import ContenedorNew from './contenedorNew.js';
const contMsjs = new ContenedorNew();
const options = { userNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        options
    }),
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
        maxAge: 10000
    },
    rolling: true
}))
app.listen(port, () => console.log(`Servidor activo en http://localhost:${port}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())

import path from 'path';
const __dirname = path.resolve();
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'marcoDeslogueado.hbs',
        layoutsDir: __dirname + '/src/views/layouts',
        partialsDir: __dirname + '/src/views/partials',
    }),
)

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/src/public/login.html')
})

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/productos',
    failureRedirect: '/login'
}))

app.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user.displayName;
        req.logout()
        res.render('logout', {
            layout: 'marcoDeslogueado',
            user
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/productos', Middlewares.authMiddleware, (req, res) => {
    const productos = fakerProds(5);
    res.render('bodyProducts', {
        layout: 'marcoLogueado',
        productos,
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value
    });
})

app.get('/mensajes', Middlewares.authMiddleware, async(req, res) => {
    const mensajes = await contMsjs.getAllMessages()
    res.render('mensajes', {
        layout: 'marcoLogueado',
        mensajes,
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value
    });
})