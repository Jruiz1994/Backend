import { infoView } from '../controllers/info.controllers.js';
import { randomView } from '../controllers/random.controllers.js';
import { Router } from 'express';
const infoRouter = Router();

infoRouter
    .get('/info', infoView)
    .get('/randoms', randomView)

export default infoRouter