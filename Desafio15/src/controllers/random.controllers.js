import { fork } from 'child_process';
import path from 'path';
const __dirname = path.resolve();

const randomView = (req, res) => {
    let cantidad = +req.query.cantidad
    if (!cantidad) cantidad = 1e8
    const procesoPadre = fork(__dirname + '/src/utils/proceso.hijo.js')
    procesoPadre.on('message', respuestaChild => {
        if (respuestaChild == 'estoyListo') {
            procesoPadre.send(cantidad)
        } else {
            const numerosJson = JSON.stringify(respuestaChild)
            res.end('Resultado: ' + numerosJson)
            procesoPadre.kill()
        }
    })
}
export { randomView }