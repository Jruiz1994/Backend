import { productsService } from '../services/index.js'

//GET ALL
export async function getAll(req, res) {
    try {
        const data = await productsService.getAll();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
}

//GET BY ID 
export async function getById(req, res) {
    const { id } = req.params;
    const data = await productsService.getById(id);
    if (data) {
        res.status(200).send(data)
    } else {
        res.send('El producto que se intenta ver no existe')
    }
}

//POST
export async function saveProduct(req, res) {
    const { body } = req;
    await productsService.saveProduct(body);
    res.status(200).send(body)
}

//DELETE
export async function deleteProduct(req, res) {
    const { id } = req.params;
    const borrado = await productsService.deleteById(id);
    if (borrado) {
        res.send({ borrado });
    } else {
        res.send('El producto que se intenta borrar no existe')
    }
}

//PUT
export async function updateProduct(req, res) {
    const { body, params: { id } } = req;
    const anterior = await productsService.getById(id);
    const nuevo = await productsService.updateById(id, body);
    if (anterior) {
        res.send({ anterior, nuevo });
    } else {
        res.send('El producto que se intenta actualizar no existe')
    }
}