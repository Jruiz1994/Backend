const { promises: fs } = require('fs');

class Contenedor {

    constructor(file) { this.file = file }

    getAll = async() => {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            return JSON.parse(lista)
        } catch (error) {
            return []
        }
    };

    getById = async id => {
        const lista = await this.getAll();
        const buscado = lista.find(product => product.id == id);
        return buscado
    };

    saveProduct = async product => {
        const lista = await this.getAll();
        let newId;
        if (lista.length == 0) {
            newId = 1
        } else {
            newId = lista[lista.length - 1].id + 1
        };
        const newProduct = {...product, id: newId, timestamp: Date.now() };
        lista.push(newProduct);
        const nuevaLista = JSON.stringify(lista, null, 2);
        try {
            await fs.writeFile(this.file, nuevaLista);
            return newId
        } catch (error) {
            throw new Error(`Error al guardar lista: ${error}`)
        }
    };

    saveProductIntoCart = async(idCart, prodAAgregar) => {
        try {
            const listaCarts = await this.getAll();
            const index = listaCarts.findIndex(carrito => carrito.id == idCart);
            let cart = listaCarts[index];
            if (cart) {
                cart.productos.push(prodAAgregar)
                const nuevaListaJson = JSON.stringify(listaCarts);
                await this.saveList(nuevaListaJson);
            }
        } catch (error) {
            throw new Error(`Error al guardar listaProds: ${error}`)
        }
    };

    saveCart = async() => {
        const listaCarts = await this.getAll();
        let newId;
        if (listaCarts.length == 0) {
            newId = 1
        } else {
            newId = listaCarts[listaCarts.length - 1].id + 1
        };
        const newCart = { id: newId, timestamp: Date.now(), productos: [] };
        listaCarts.push(newCart)
        const nuevaLista = JSON.stringify(listaCarts, null, 2);
        try {
            await fs.writeFile(this.file, nuevaLista);
            return newId
        } catch (error) {
            throw new Error(`Error al guardar lista: ${error}`)
        }
    }

    saveList = async(list) => {
        await fs.writeFile(this.file, list, (err) => {
            if (err) throw err;
        });
    }

    updateById = async(id, newProduct) => {
        let lista = await this.getAll();
        const index = lista.findIndex(product => product.id == id);
        let producto = lista[index];
        if (producto) {
            const { description, code, stock, title, price, thumbnail } = newProduct;
            producto.title = title;
            producto.description = description;
            producto.code = code;
            producto.stock = stock;
            producto.price = price;
            producto.thumbnail = thumbnail;
            lista[index] = producto;
            const nuevaListaJson = JSON.stringify(lista);
            await this.saveList(nuevaListaJson);
            return producto
        } else {
            return null
        }
    };

    deleteById = async(id) => {
        try {
            const lista = await this.getAll();
            const producto = await this.getById(id);
            if (producto) {
                const nuevaLista = lista.filter(product => product.id != id);
                const nuevaListaJson = JSON.stringify(nuevaLista); // Convertir de formato Objeto a String
                await this.saveList(nuevaListaJson);
                return producto
            } else {
                return null
            }
        } catch (error) {
            console.log({ error: 'producto no encontrado' });
        }
    }

    deleteProductFromCartById = async(idCart, id_prod) => {
        try {
            const lista = await this.getAll();
            const index = lista.findIndex(cart => cart.id == idCart);
            const carrito = await this.getById(idCart)
            const borrado = {};
            if (carrito) {
                for (let i = 0; i < carrito.productos.length; i++) {
                    if (carrito.productos[i].id == id_prod) {
                        carrito.productos.splice(i, 1)
                    }
                }
                lista[index] = carrito;
                const nuevaListaJson = JSON.stringify(lista);
                await this.saveList(nuevaListaJson);
                return borrado
            }
        } catch (error) {
            console.log({ error: 'producto no encontrado' });
        }
    }
}
module.exports = Contenedor