import express from 'express'
import * as productController from '../controllers/product.controller.js'
const router = new express.Router();

router.get('/', productController.getProducts)
router.post('/', productController.createProduct)
router.delete('/:id', productController.deleteProducts)
router.patch('/:id', productController.updateProducts)
router.post('/ct', productController.createTable)

export default router;