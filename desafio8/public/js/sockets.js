/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io.connect();
//LISTA DE PRODUCTOS
socket.on('productos', products => {
    const html = tableRows(products);
    document.getElementById('productsTable').innerHTML = html;
});

const tableRows = products => products.map(product =>
    `
      <tr>
          <td class='p'>${product.title}</td>
          <td class='p'>$${product.price}</td>
          <td><img src=${product.thumbnail}></td>
      </tr>
  `
).join(' ');

//NUEVO PRODUCTO
const productTitle = document.getElementById('title');
const productDescription = document.getElementById('description');
const productCode = document.getElementById('code');
const productPrice = document.getElementById('price');
const productStock = document.getElementById('stock');
const productThumbnail = document.getElementById('thumbnail');
const productSend = document.getElementById('productSend');
const formularioProductos = document.getElementById('formulario')

formularioProductos.addEventListener('submit', e => {
    e.preventDefault();
    const prod = {
        title: productTitle.value,
        description: productDescription.value,
        code: productCode.value,
        price: productPrice.value,
        stock: productStock.value,
        thumbnail: productThumbnail.value
    };
    socket.emit('nuevoProducto', prod);
    formularioProductos.reset();
});


// MENSAJES:
//NUEVO MENSAJE
const user = document.getElementById('user');
const message = document.getElementById('msg');
const send = document.getElementById('send');
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = {
        user: user.value,
        text: message.value
    };
    socket.emit('nuevoMensaje', msg);
    messageForm.reset();
    message.focus();
});

//LISTA DE MENSAJES
socket.on('mensajes', msg => {
    const html = listaMensajes(msg);
    document.getElementById('mensajes').innerHTML = html;
});

const listaMensajes = mensajes => mensajes.map(msg =>
    `
    <div>
      <b style="color:blue;">${msg.user}</b>
      [<span style="color:brown;">${msg.timestamp}</span>] :
      <i style="color:green;">${msg.text}</i>
    </div>
  `
).join(' ');