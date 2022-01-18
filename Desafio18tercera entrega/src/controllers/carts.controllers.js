import cartsService from '../services/carts.service.js'
import { UserModel } from '../models/user.model.js';

import { cartsModel } from '../models/carts.model.js';
const cartService = new cartsService(cartsModel);

import logger from '../utils/logger.util.js';


//GET ALL CARRITOS
export async function getAll(req, res) {
    try {
        const data = await cartService.getAllCarts();
        res.status(200).send(data)
    } catch (error) {
        logger.error(error);
    }
}

//POST CARRITO
export async function saveCart(req, res) {
    try {
        const cart = await cartService.saveCart();
        if (req.user) {
            const id = req.user._id;
            const user = await UserModel.findById(id);
            user.carts.push(cart._id);
            await user.save();
            res.status(200).send(cart)
        } else {
            res.status(401).send('No estas logueado')
        }
    } catch (error) {
        logger.error(error);
    }
}

//DELETE CARRITO OK
export async function deleteById(req, res) {
    const { id } = req.params;
    const borrado = await cartService.deleteCartById(id);
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
    await cartService.saveProductIntoCart(idCart, idProd);
    res.status(200).send("Producto agregado al carrito")
}

//GET ALL PRODUCTOS DE UN CARRITO OK
export async function getById(req, res) {
    const { idCart } = req.params;
    try {
        const data = await cartService.getProductsByCartId(idCart);
        res.status(200).send(data)
    } catch (error) {
        logger.error(error);
    }
}

//DELETE PRODUCTOS OK
export async function deleteProductFromCartById(req, res) {
    const { idCart } = req.params;
    const { id_prod } = req.params;
    const borrado = await cartService.deleteProductFromCartById(idCart, id_prod);
    if (borrado) {
        res.send(`Producto con id ${id_prod} eliminado del carrito con id ${idCart}`);
    }
}

//POST BUY CART
export async function buyCart(req, res) {
    if (req.user) {
        const { name, email, telephone, carts } = req.user
        const { idCart } = req.params;
        const encontro = carts.find(carrito => carrito._id == idCart)
        if (encontro) {
            try {
                const comprado = await cartService.buyCart(name, email, telephone, idCart);
                if (comprado) {
                    res.status(200).json({ msg: 'Compra realizada' })
                } else { res.status(404).json({ msg: 'Error al procesar la compra' }) }
            } catch (error) { logger.error(error) }
        } else {
            res.status(400).send('No puedes comprar este carrito')
        }
    } else {
        res.status(401).send("Debes iniciar sesion")
    }
}