import { randomList } from '../utils/proceso.hijo.js';

const randomView = (req, res) => {
    let cantidad = +req.query.cantidad
    if (!cantidad) cantidad = 1e8
    const numeros = randomList(cantidad)
    const numerosJson = JSON.stringify(numeros)
    res.end('Resultado: ' + numerosJson)
}
export { randomView }