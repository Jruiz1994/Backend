import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { productsView, loginView, logoutView } from '../controllers/views.controllers.js';
import { Router } from 'express';
const viewsRouter = Router();

viewsRouter
    .get('/', loginView)
    .get('/login', loginView)
    .get('/products', authMiddleware, productsView)
    .get('/logout', logoutView)

export default viewsRouter