import Services from './services.js'
// import ProductServices from './products.service.js'

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
            console.log(respuesta)
            return respuesta._id
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductsByCartId(idCart) {
        try {
            const cart = await this.model.findById(idCart);
            const productos = await cart.populate('productos');
            return productos
        } catch (error) { console.log(error) }
    }


    async deleteProductFromCartById(idCart, id_prod) {
        try {
            const carrito = await this.model.findById(idCart)
            if (carrito) {
                for (let i = 0; i < carrito.productos.length; i++) {
                    if (carrito.productos[i]._id == id_prod) {
                        carrito.productos.splice(i, 1)
                        await carrito.save()
                        console.log(carrito);
                        break
                    }
                }
            }
            return carrito
        } catch (error) {
            console.log(error);
        }
    }

    async saveProductIntoCart(idCart, idProdAAgregar) {
        try {
            const cart = await this.model.findById(idCart)
            cart.productos.push(idProdAAgregar)
            await cart.save()
            console.log(cart);
            return cart
        } catch (error) {
            console.log(error);
        }
    }
}
export default CartsService;