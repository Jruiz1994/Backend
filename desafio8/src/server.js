import './db.js'
import express from 'express'
import routerProductos from './routers/product.router.js';
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', routerProductos)

const port = 8080;
app.listen(port, () => { console.log(`Server escuchando en: 8080`) })