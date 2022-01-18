import dotenv from 'dotenv';
dotenv.config();


const { MONGODB_URI, SECRET, NODE_ENV } = process.env;

import express from 'express';
const app = express();

// Session
import session from 'express-session';
import MongoSession from 'connect-mongodb-session';

const MongoStore = MongoSession(session);

const store = new MongoStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(session({
    store,
    resave: true,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {
        maxAge: 10000,
        sameSite: NODE_ENV == 'development' ? 'lax' : 'strict',
    },
    rolling: true
}));

// Middleware para evitar que luego de hacer LogOut se pueda volver a la página de productos
// por estar guardada en la memoria caché del navegador:
import { cacheControl } from './middlewares/cache.middlewares.js';

// Middlewares
import { routesLogger, noRouteLogger } from './middlewares/logger.middleware.js'

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(cacheControl) // Tiene que ir antes de los middlewares de Passport y de los Routers
    .use(routesLogger);

// Passport
import passport from 'passport';

app
    .use(passport.initialize())
    .use(passport.session());

// Handlebars
import handlebars from 'express-handlebars';
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

// Routers
import apiRouter from './routers/api.router.js';
import passportRouter from './routers/passport.router.js';
import viewsRouter from './routers/views.router.js';

app
    .use('/api', apiRouter)
    .use('/auth', passportRouter)
    .use('/', viewsRouter);

//Middleware para rutas no implementadas
app.use('*', noRouteLogger)

export default app;