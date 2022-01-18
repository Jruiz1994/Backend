import Services from './services.js'
import logger from '../utils/logger.util.js'
import { sendWhatsapp } from '../utils/twilio.util.js';
import { sendGmail } from '../utils/nodemailer.util.js';
import { config } from '../config.js';
class CartsService extends Services {
    constructor(model) { super(model) }

    async getAllCarts() {
        const respuesta = await this.getAll()
        return respuesta
    }

    async deleteCartById(id) {
        const respuesta = await this.deleteById(id)
        return respuesta
    }

    async saveCart() {
        try {
            const respuesta = await this.saveItem({ productos: [] })
            return respuesta
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductsByCartId(idCart) {
        try {
            const cart = await this.model.findById(idCart);
            const productos = await cart.populate('productos');
            return productos
        } catch (error) { logger.error(error) }
    }


    async deleteProductFromCartById(idCart, id_prod) {
        try {
            const carrito = await this.model.findById(idCart)
            if (carrito) {
                for (let i = 0; i < carrito.productos.length; i++) {
                    if (carrito.productos[i]._id == id_prod) {
                        carrito.productos.splice(i, 1)
                        await carrito.save()
                        break
                    }
                }
            }
            return carrito
        } catch (error) {
            logger.error(error);
        }
    }

    async saveProductIntoCart(idCart, idProdAAgregar) {
        try {
            const cart = await this.model.findById(idCart)
            cart.productos.push(idProdAAgregar)
            await cart.save()
            return cart
        } catch (error) {
            logger.error(error);
        }
    }

    async buyCart(name, email, telephone, idCart) {
        let contentWhatsappAdmin = `Nuevo pedido de ${ name }, email: ${ email }`
        let contentWhatsappBuyer = `Hola, ${ name }. Su pedido fue recibido y se encuentra en proceso. Fue realizado con este email: ${ email }`
        let contenidoMail = `<h3>Nuevo pedido de ${name}, su email es: ${email} </h3><h2>Productos: </h2>`
        let cart = await this.getProductsByCartId(idCart)
        if (!cart.comprado) {
            const products = cart.productos
            let tabla = "<table border=1>";
            tabla += ` <tr><th>Producto</th><th>Precio</th></tr>`;
            for (let i = 0; i < products.length; i++) {
                let name = products[i].title;
                let price = products[i].price;
                tabla += `<tr><td>${name}</td><td>${price}</td></tr>`;
            }
            tabla += "</table>";
            contenidoMail += tabla;
            try {
                cart.comprado = true
                await cart.save()
                await sendGmail(config.mailAdmin, `Nuevo pedido de ${name} email: ${email}`, contenidoMail)
                await sendWhatsapp(config.telAdmin, contentWhatsappAdmin)
                await sendWhatsapp(telephone, contentWhatsappBuyer)
            } catch (error) {
                logger.error(error)
            }
            return cart
        }
    }
}


export default CartsService;