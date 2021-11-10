const express = require('express');
const router = express.Router();
const app = express();
const validateData = require('./src/middlewares/middlewares')
const Contenedor = require('./src/contenedor')
let conten = new Contenedor('./src/productos.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/productos', router)

router.get('/front', async(req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(__dirname + '/public/index.html')
})

//GET ALL
router.get('/', async(req, res) => {
    try {
        const data = await conten.getAll();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
})

//GET BY ID 
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const data = await conten.getByID(id);
    if (data) {
        res.status(200).send(data)
    } else {
        res.send('El producto que se intenta ver no existe')
    }
})

//POST
router.post('/', validateData, async(req, res) => {
    const { body } = req;
    await conten.save(body);
    res.status(200).send(body)
})

//DELETE
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const borrado = await conten.deleteById(id);
    if (borrado) {
        res.send({ borrado });
    } else {
        res.send('El producto que se intenta borrar no existe')
    }
});

//PUT
router.put('/:id', async(req, res) => {
    const { body, params: { id } } = req;
    const anterior = await conten.getByID(id);
    const nuevo = await conten.updateById(id, body);
    if (anterior) {
        res.send({ anterior, nuevo });
    } else {
        res.send('El producto que se intenta actualizar no existe')
    }
});

const port = 8080;
app.listen(port, () => { console.log(`Server escuchando en: 8080`) })