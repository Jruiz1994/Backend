const express = require('express');
const app = express();
app.set('views', './views')
app.set('view engine', 'pug');
const Contenedor = require('./src/contenedor')
let conten = new Contenedor('./src/productos.js')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('formulario')
})

// GET ALL
app.get('/productos', async(req, res) => {
    const productos = await conten.getAll();
    res.render('viewProductos', {
        productos
    })
})

//POST
app.post('/productos', async(req, res) => {
    const { body } = req;
    await conten.save(body);
    res.redirect('/')
})

const port = 8080;
app.listen(port, () => { console.log(`Server escuchando en: 8080`) })