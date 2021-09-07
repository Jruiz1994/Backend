const express = require('express');
const { Router } = express;
const app = express();
// const validateAdmin = require('./validateAdmin')
const Contenedor = require('./contenedor')
let conten = new Contenedor('./src/productos.json')
let carrito = new Contenedor('./src/carrito.json')
const routerProductos = new Router();
const routerCarrito = new Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

/* -------------------------------------------------------------------------- */
/*                                  PRODUCTOS                                 */
/* -------------------------------------------------------------------------- */
//GET ALL
routerProductos.get('/', async(req, res) => {
    try {
        const data = await conten.getAll();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
})

//GET BY ID 
routerProductos.get('/:id', async(req, res) => {
    const { id } = req.params;
    const data = await conten.getById(id);
    if (data) {
        res.status(200).send(data)
    } else {
        res.send('El producto que se intenta ver no existe')
    }
})

//POST
//ACA AGREGAR EL MIDDLEWARE VALIDATEADMIN
routerProductos.post('/', async(req, res) => {
    const { body } = req;
    await conten.saveProduct(body);
    res.status(200).send(body)
})

//DELETE
//ACA AGREGAR EL MIDDLEWARE VALIDATEADMIN
routerProductos.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const borrado = await conten.deleteById(id);
    if (borrado) {
        res.send({ borrado });
    } else {
        res.send('El producto que se intenta borrar no existe')
    }
});

//PUT
routerProductos.put('/:id', async(req, res) => {
    const { body, params: { id } } = req;
    const anterior = await conten.getById(id);
    const nuevo = await conten.updateById(id, body);
    if (anterior) {
        res.send({ anterior, nuevo });
    } else {
        res.send('El producto que se intenta actualizar no existe')
    }
});

/* -------------------------------------------------------------------------- */
/*                                   CARRITO                                  */
/* -------------------------------------------------------------------------- */
//POST CARRITO OK
routerCarrito.post('/', async(req, res) => {
    const idCarrito = await carrito.saveCart();
    res.status(200).send("Carrito creado con id " + idCarrito)
})

//DELETE CARRITO OK
routerCarrito.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const borrado = await carrito.deleteById(id);
    if (borrado) {
        res.send({ borrado });
    } else {
        res.send('El carrito que se intenta borrar no existe')
    }
});

//POST PRODUCTOS EN CARRITO OK
routerCarrito.post('/:idCart/productos/:idProd', async(req, res) => {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const prodAAgregar = await conten.getById(idProd);
    await carrito.saveProductIntoCart(idCart, prodAAgregar);
    res.status(200).send("Producto agregado al carrito")
})

//GET ALL PRODUCTOS DE UN CARRITO OK
routerCarrito.get('/:idCart/productos', async(req, res) => {
    const { idCart } = req.params;
    try {
        const data = await carrito.getById(idCart);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
})

//DELETE PRODUCTOS
routerCarrito.delete('/:idCart/productos/:id_prod', async(req, res) => {
    const { idCart } = req.params;
    const { id_prod } = req.params;
    const borrado = await carrito.deleteProductFromCartById(idCart, id_prod);
    if (borrado) {
        res.send({ borrado });
    } else {
        res.send('El producto que se intenta borrar no existe')
    }
});

const port = 8080;
app.listen(port, () => { console.log(`Server escuchando en: 8080`) })