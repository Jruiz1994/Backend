import { infoView } from '../controllers/info.controllers.js';
import { randomView } from '../controllers/random.controllers.js';
import { Router } from 'express';
const infoRouter = Router();
import compression from 'compression'

infoRouter
    .get('/info', compression(), infoView)
    .get('/randoms', randomView)


export default infoRouter