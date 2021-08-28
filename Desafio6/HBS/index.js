const express = require('express');
const handlebars = require('express-handlebars')
const router = express.Router();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const Contenedor = require('./src/contenedor')
let conten = new Contenedor('./src/productos.js')
const contenedorMensajes = new Contenedor('./src/mensajes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router)

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'marcoFormulario.hbs',
        // eslint-disable-next-line no-undef
        layoutsDir: __dirname + '/src/views/layouts',
        // eslint-disable-next-line no-undef
        partialsDir: __dirname + '/src/views/partials',
    }),
)

app.set('views', './src/views')
app.set('view engine', 'hbs')

router.get('/', (req, res) => {
    // eslint-disable-next-line no-undef
    res.render('formulario', { layout: 'marcoFormulario' });
})

//GET ALL
router.get('/productos', async(req, res) => {
    const productos = await conten.getAll();
    res.render('bodyProducts', {
        layout: 'marcoFormulario',
        productos
    });
});

//POST
router.post('/productos', async(req, res) => {
    const { body } = req;
    await conten.save(body);
    res.redirect('/')
})

io.on('connection', async socket => {

    const products = await conten.getAll();

    socket.emit('productos', products);
    socket.on('nuevoProducto', async producto => {

        await conten.saveProduct(producto);

        io.emit('productos', products);
    })

    const messages = await contenedorMensajes.getAll();

    socket.emit('mensajes', messages);
    socket.on('nuevoMensaje', async msg => {
        msg.fyh = new Date().toLocaleString();
        await contenedorMensajes.save(msg);
        io.emit('mensajes', messages);
    })

});

const port = 8080;
server.listen(port, () => { console.log(`Server escuchando en: 8080`) })