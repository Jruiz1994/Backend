import express from 'express';
const app = express();
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
import session from 'express-session';
import * as Middlewares from './middlewares/auth.middleware.js';
import handlebars from 'express-handlebars'
const port = 8080;
import faker from 'faker'
faker.locale = 'es'
dotenv.config()
import ContenedorNew from './contenedorNew.js';
const contMsjs = new ContenedorNew();
const options = { userNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        options
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
        maxAge: 60000
    },
    rolling: true
}))
app.listen(port, () => console.log(`Servidor activo en http://localhost:${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    res.render('login', {
        layout: 'marcoDeslogueado'
    });
})

app.post('/login', Middlewares.loginMiddleware, (req, res) => {
    const { body } = req;
    req.session.user = body.user;
    res.redirect('/productos')
})

app.get('/logout', Middlewares.authMiddleware, (req, res) => {
    const user = req.session.user;
    req.session.destroy((err) => {
        if (!err) {
            res.render('logout', {
                layout: 'marcoDeslogueado',
                user
            })
        } else {
            res.json({ err })
        }
    })
})

app.get('/productos', Middlewares.authMiddleware, (req, res) => {
    const user = req.session.user;
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
        user
    });
})

app.get('/mensajes', Middlewares.authMiddleware, async(req, res) => {
    const user = req.session.user;
    const mensajes = await contMsjs.getAllMessages()
    res.render('mensajes', {
        layout: 'marcoLogueado',
        mensajes,
        user
    });
})