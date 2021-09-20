import { cartsModel } from '../models/index.js'

export async function saveCart() {
    try {
        const response = await cartsModel.create()
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getById(idCart) {
    try {
        const respuesta = await cartsModel.find({ _id: idCart })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function deleteById(idCart) {
    try {
        const respuesta = await cartsModel.deleteOne({ _id: idCart })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProductFromCartById(idCart, id_prod) {
    try {
        const respuesta = await cartsModel.deleteOne({ _id: idCart, 'products._id': id_prod })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function saveProductIntoCart(idCart, prodAAgregar) {
    try {
        const respuesta = await cartsModel.create({ _id: idCart, 'products': prodAAgregar })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}