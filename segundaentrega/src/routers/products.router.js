import express from 'express'
import { productsControllers } from '../controllers/index.js'
import validateAdmin from '../middlewares/validateAdmin.js'

const productsRouter = new express.Router()

//GET ALL
productsRouter.get('/', productsControllers.getAll)
    .get('/:id', productsControllers.getById)
    .post('/', validateAdmin.validateAdmin, productsControllers.saveProduct)
    .delete('/:id', validateAdmin.validateAdmin, productsControllers.deleteProduct)
    .put('/:id', validateAdmin.validateAdmin, productsControllers.updateProduct)


export default { productsRouter }