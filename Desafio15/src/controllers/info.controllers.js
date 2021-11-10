import { processData } from '../utils/info.utils.js';
//Cantidad de nucleos
import os from 'os'
const cpuCount = os.cpus().length;

const infoView = (req, res) => {
    res.render('info', {
        layout: 'marcoDeslogueado',
        processData,
        cpuCount
    })
}

export { infoView }