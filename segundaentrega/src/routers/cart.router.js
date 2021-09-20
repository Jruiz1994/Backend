import express from 'express'
import { cartsControllers } from '../controllers/index.js'

const cartRouter = express.Router()

//GET ALL
cartRouter.get('/:idCart/productos', cartsControllers.getById)
    .post('/', cartsControllers.saveCart)
    .delete('/:id', cartsControllers.deleteById)
    .post('/:idCart/productos/:idProd', cartsControllers.saveProductIntoCart)
    .delete('/:idCart/productos/:id_prod', cartsControllers.deleteProductFromCartById)


export { cartRouter }