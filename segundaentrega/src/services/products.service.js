import { productsModel } from '../models/index.js'

export async function getAll() {
    try {
        const respuesta = await productsModel.find()
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function getById(idProd) {
    try {
        const respuesta = await productsModel.findOne({ _id: idProd })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function saveProduct(body) {
    try {
        const respuesta = await productsModel.create(body)
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function deleteById(id) {
    try {
        const respuesta = await productsModel.deleteOne({ _id: id })
        console.log(respuesta);

        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export async function updateById(id, body) {
    try {
        const respuesta = await productsModel.updateOne({
            _id: id,
            ...body
        })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error);
    }
}