import express from 'express'
import { productsControllers } from '../controllers/index.js'
import validateAdmin from '../middlewares/validateAdmin.js'

const productsRouter = express.Router()

//GET ALL
productsRouter.get('/', productsControllers.getAll)
    .get('/:id', productsControllers.getById)
    .post('/', validateAdmin, productsControllers.saveProduct)
    .delete('/:id', validateAdmin, productsControllers.deleteProduct)
    .put('/:id', validateAdmin, productsControllers.updateProduct)


export { productsRouter }