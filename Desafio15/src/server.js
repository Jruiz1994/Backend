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
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(cacheControl) // Tiene que ir antes de los middlewares de Passport y de los Routers
;

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

// Server y minimist
import minimist from 'minimist';
import cluster from 'cluster';
const options = {
    default: {
        port: 8080,
        modo: 'fork'
    }
}

//Para ver la cantidad de cpus
import os from 'os';
const ncpus = os.cpus().length;

const { modo, port } = minimist(process.argv.slice(2), options);
console.log("modo", modo);
console.log("port", port);


if (modo == 'cluster' && cluster.isMaster) { //si el proceso es master, que genere un worker por cada nucleo para balancear la carga
    console.log(`master pid ${process.pid}`);
    for (let i = 0; i < ncpus; i++) {
        cluster.fork()
    }
    // eslint-disable-next-line no-unused-vars
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker PID ${worker.process.pid} died`)
        cluster.fork() //levanto un server nuevo cuando muere otro
    })
} else {
    const server = app.listen(port, () => console.log(
        `Server en http://localhost:${port} / pid: ${process.pid}`
    ));
    server.on('error', err => console.log(err))
}