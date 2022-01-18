import logger from '../utils/logger.utils.js';

const routesLogger = (req, res, next) => {

    logger.info(`${req.method} ${req.path}`);
    next()
}

const noRouteLogger = (req, res, next) => {

    logger.warn(`Ruta inexistente: ${req.method} ${req.originalUrl}`);
    next()
}

export { routesLogger, noRouteLogger }