import { Router } from 'express';

const apiRouter = Router();

import cartRouter from './cart.router.js';
import productsRouter from './productRoutes.js';

apiRouter
    .use('/carts', cartRouter)
    .use('/products', productsRouter);

export default apiRouter