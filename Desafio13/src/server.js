import express from 'express';
const app = express();
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
import session from 'express-session';
import handlebars from 'express-handlebars'
const port = 8080;
import faker from 'faker'
faker.locale = 'es'
dotenv.config()
import passport from 'passport'
import { Strategy } from 'passport-facebook'
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
        maxAge: 600000
    },
    rolling: true
}))
app.listen(port, () => console.log(`Servidor activo en http://localhost:${port}`));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'photos'],
    scope: ['email']
}, (accessToken, refreshToken, userProfile, done) => {
    return done(null, userProfile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((id, done) => {
    done(null, id)
})


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
    failureRedirect: '/logout'
}))

app.get('/logout', (req, res) => {
    const user = req.user.displayName;
    req.logout()
    res.render('logout', {
        layout: 'marcoDeslogueado',
        user
    })
})

app.get('/productos', (req, res) => {
    if (req.isAuthenticated()) {
        const productos = [];
        for (let i = 0; i < 5; i++) {
            const prod = {}
            prod.id = i + 1
            prod.title = faker.commerce.productName()
            prod.price = faker.commerce.price()
            prod.thumbnail = faker.image.image()
            productos.push(prod)
        }
        res.render('bodyProducts', {
            layout: 'marcoLogueado',
            productos,
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
            email: req.user.emails[0].value
        });
    } else {
        res.redirect('/login')
    }
})

app.get('/mensajes', async(req, res) => {
    if (req.isAuthenticated()) {
        const mensajes = await contMsjs.getAllMessages()
        res.render('mensajes', {
            layout: 'marcoLogueado',
            mensajes,
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
            email: req.user.emails[0].value
        });
    } else {
        res.redirect('/login')
    }
})