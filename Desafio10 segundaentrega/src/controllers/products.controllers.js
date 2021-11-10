import productsService from '../services/products.service.js'
import { productsModel } from '../models/products.model.js';
const productService = new productsService(productsModel);

//GET ALL
export async function getAll(req, res) {
    try {
        const data = await productService.getAllProds();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
}

//GET BY ID 
export async function getById(req, res) {
    const { id } = req.params;
    const data = await productService.getProdById(id);
    if (data) {
        res.status(200).send(data)
    } else {
        res.send('El producto que se intenta ver no existe')
    }
}

//POST
export async function saveProduct(req, res) {
    const { body } = req;
    await productService.create(body);
    res.status(200).send(body)
}

//DELETE
export async function deleteProduct(req, res) {
    const { id } = req.params;
    const borrado = await productService.deleteProdById(id);
    if (borrado) {
        res.status(200).send(`El producto con id ${id} fue eliminado`);
    } else {
        res.send('El producto que se intenta borrar no existe')
    }
}

//PUT
export async function updateProduct(req, res) {
    const { body, params: { id } } = req;
    const anterior = await productService.getById(id);
    const nuevo = await productService.updateById(id, body);
    if (anterior) {
        res.send({ anterior, nuevo });
    } else {
        res.send('El producto que se intenta actualizar no existe')
    }
}