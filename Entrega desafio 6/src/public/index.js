const socket = io.connect()

//PRODUCTOS
socket.on('productos', products => {
    const html = filasTabla(products);
    document.getElementById('productsTable').innerHTML = html;
})

const filasTabla = products => products.map(product =>
    `
      <tr>
          <td class="p">${product.producto.title}</td>
          <td class="p">$${product.producto.price}</td>
          <td><img src=${product.producto.thumbnail}></td>
      </tr>
  `
).join(' ');


//MENSAJES
const form = document.getElementById('formMsg');
const author = document.getElementById('author');
const message = document.getElementById('message');
const send = document.getElementById('send');

form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = {
        user: author.value,
        message: message.value
    }
    socket.emit('nuevoMensaje', msg)
    form.reset();
})


socket.on('mensajes', data => {
    const html = listaMensajes(data);
    document.getElementById('mensajes').innerHTML = html;
})

const listaMensajes = mensajes => mensajes.map(msg =>
    `
    <div>
      <b style="color:blue;">${msg.author}</b>
      [<span style="color:brown;">${msg.fyh}</span>] :
      <i style="color:green;">${msg.text}</i>
    </div>
  `
).join(' ');