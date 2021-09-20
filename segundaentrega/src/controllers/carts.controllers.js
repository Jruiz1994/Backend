import { cartsService, productsService } from '../services/index.js'

//POST CARRITO OK
export async function saveCart(req, res) {
    const idCarrito = await cartsService.saveCart();
    res.status(200).send("Carrito creado con id " + idCarrito)
}

//DELETE CARRITO OK
export async function deleteById(req, res) {
    const { id } = req.params;
    const borrado = await cartsService.deleteById(id);
    if (borrado) {
        res.send({ borrado });
    } else {
        res.send('El carrito que se intenta borrar no existe')
    }
}

//POST PRODUCTOS EN CARRITO OK
export async function saveProductIntoCart(req, res) {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const prodAAgregar = await productsService.getById(idProd);
    await cartsService.saveProductIntoCart(idCart, prodAAgregar);
    res.status(200).send("Producto agregado al carrito")
}

//GET ALL PRODUCTOS DE UN CARRITO OK
export async function getById(req, res) {
    const { idCart } = req.params;
    try {
        const data = await cartsService.getById(idCart);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
}

//DELETE PRODUCTOS OK
export async function deleteProductFromCartById(req, res) {
    const { idCart } = req.params;
    const { id_prod } = req.params;
    const borrado = await cartsService.deleteProductFromCartById(idCart, id_prod);
    if (borrado) {
        res.send(`Producto con id ${id_prod} eliminado del carrito con id ${idCart}`);
    }
}