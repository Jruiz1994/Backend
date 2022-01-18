import express from 'express'
import { cartsControllers } from '../controllers/index.js'

const cartRouter = new express.Router()

//GET ALL
cartRouter.get('/:idCart/productos', cartsControllers.getById)
    .get('/', cartsControllers.getAll)
    .post('/', cartsControllers.saveCart)
    .delete('/:id', cartsControllers.deleteById)
    .post('/:idCart/productos/:idProd', cartsControllers.saveProductIntoCart)
    .delete('/:idCart/productos/:id_prod', cartsControllers.deleteProductFromCartById)
    .post('/:idCart', cartsControllers.buyCart);


export default cartRouter;