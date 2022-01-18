import app from './server.js';
import logger from './utils/logger.utils.js';

// Server y minimist
import minimist from 'minimist';
import cluster from 'cluster';
const options = {
    default: {
        port: 8080,
        modo: 'fork'
    }
}

//Para ver la cantidad de cpus
import os from 'os';
const ncpus = os.cpus().length;

const { modo, port } = minimist(process.argv.slice(2), options);
logger.info(`modo: ${modo}`);
logger.info(`port: ${port}`);


if (modo == 'cluster' && cluster.isMaster) { //si el proceso es master, que genere un worker por cada nucleo para balancear la carga
    logger.info(`master pid ${process.pid}`);
    for (let i = 0; i < ncpus; i++) {
        cluster.fork()
    }
    // eslint-disable-next-line no-unused-vars
    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker PID ${worker.process.pid} died`)
        cluster.fork() //levanto un server nuevo cuando muere otro
    })
} else {
    const server = app.listen(port, () => logger.info(
        `Server en http://localhost:${port} / pid: ${process.pid}`
    ));
    server.on('error', err => logger.error(err))
}