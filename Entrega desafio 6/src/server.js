const express = require('express');
const emoji = require('node-emoji');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ContenedorProductos = require('./contenedorProductos');
const contenedorProductos = new ContenedorProductos('./src/productos.js');
const ContenedorMensajes = require('./contenedorMensajes');
const contenedorMensajes = new ContenedorMensajes('./src/mensajes.json');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))

app.get('/', (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(__dirname + '/public/index.html')
})

httpServer.listen(8080, () => console.log(emoji.get('computer'), 'Server started on 8080'))
let productos = [];
let messages = [];


io.on('connection', async(socket) => {
    //PARA MOSTRARLE AL CLIENTE TODOS LOS MENSAJES
    messages = await contenedorMensajes.getAll();
    // console.log(messages);
    // socket.emit('mensajes', messages);
    //VER NUEVOS MENSAJES Y EMITIRLOS AL CLIENTE
    socket.on('nuevoMensaje', async msg => {
        msg.fyh = new Date().toLocaleString();
        await contenedorMensajes.save(msg);
        io.emit('mensajes', messages)
    })

    //PARA MOSTRARLE AL CLIENTE TODOS LOS PRODUCTOS
    productos = await contenedorProductos.getAll();
    // console.log(productos);
    socket.emit('productos', productos)

    socket.on('nuevoProducto', async producto => {
        await contenedorProductos.save(producto);
        io.emit('productos', productos);
    })
})

setTimeout(() => {
    io.sockets.emit('connectionMessage', 'Chatea con nosotros y enterate de nuestras promociones')
}, 10000)