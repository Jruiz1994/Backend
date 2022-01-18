import { processData } from '../utils/info.utils.js';
//Cantidad de nucleos
import os from 'os'
const cpuCount = os.cpus().length;
import logger from '../utils/logger.utils.js';

const infoView = (req, res) => {
    try {
        res.render('info', {
                layout: 'marcoDeslogueado',
                processData,
                cpuCount
            })
            // console.log(processData)
        logger.info(processData)
    } catch (err) {
        logger.error(err)
            // console.log(err);

    }
}
export { infoView }