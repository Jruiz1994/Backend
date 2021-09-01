const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 8080;

server.listen(port, () => console.log(`Servidor activo en http://localhost:${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const Contenedor = require('./contenedor')
const contenedorProductos = new Contenedor('./src/data/productos.json');
const contenedorMensajes = new Contenedor('./src/data/mensajes.json');


// SOCKET.IO
io.on('connection', async socket => {
    // PRODUCTOS
    // Emitir al cliente la lista de productos:
    const products = await contenedorProductos.getAll();
    socket.emit('productos', products);
    // Leer desde el cliente la carga de un nuevo producto:
    socket.on('nuevoProducto', async producto => {
        await contenedorProductos.saveProduct(producto);
        // Re-emitir la lista de productos al cliente junto con el nuevo producto.
        io.emit('productos', products);
    })


    // MENSAJES
    // Emitir la lista de mensajes guardados al cliente:
    const messages = await contenedorMensajes.getAll();
    socket.emit('mensajes', messages);

    // Leer los nuevos mensajes provenientes del cliente:
    socket.on('nuevoMensaje', async msg => {
        // Incluir la fecha y hora en el objeto msg:
        msg.fyh = new Date().toLocaleString();
        // Reutilizar el método saveProduct de la clase Contenedor
        // para guardar los mensajes:
        await contenedorMensajes.saveProduct(msg);
        // Re-emitir mensajes al cliente:
        io.emit('mensajes', messages);
    })
});