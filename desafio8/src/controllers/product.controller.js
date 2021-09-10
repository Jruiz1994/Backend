import * as productService from '../services/product.service.js'

export async function createTable(req, res) {
    try {
        await productService.createTable()
        res.status(200).send('Tabla creada')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function createProduct(req, res) {
    const { body } = req
    try {
        await productService.createProduct(body)
        res.status(200).send('Producto creado')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function getProducts(req, res) {
    try {
        const productos = await productService.getProducts()
        res.status(200).json({ productos })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function deleteProducts(req, res) {
    const { id } = req.params
    try {
        await productService.deleteProducts(id)
        res.status(200).send('Producto eliminado')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function updateProducts(req, res) {
    const { id } = req.params
    const { body } = req
    try {
        await productService.updateProducts(id, body)
        res.status(200).send('Producto modificado')
    } catch (error) {
        res.status(400).send(error.message)
    }
}