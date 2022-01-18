import { Router } from 'express';

const apiRouter = Router();

import cartRouter from './cart.router.js';
import productsRouter from './products.router.js';
import userRouter from './user.router.js';

apiRouter
    .use('/carts', cartRouter)
    .use('/products', productsRouter)
    .use('/user', userRouter);

export default apiRouter