const { promises: fs } = require('fs');

class ContenedorProductos {
    constructor(nombre) {
        this.nombre = nombre, this.productos = [], this.id = 0;
    }

    async save(obj) {
        this.productos = await this.getAll();
        let lastId = 0;
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id > lastId) {
                lastId = this.productos[i].id
            }
        }
        this.productos.push({
            id: lastId + 1,
            producto: obj
        });
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(this.productos));
        } catch (error) {
            console.log(error);
        }
    }

    async saveList(list) {
        await fs.promises.writeFile(this.nombre, list, (err) => {
            if (err) throw err;
        });
    }

    async getByID(id) {
        try {
            const productos = await this.getAll();
            return productos.find(producto => producto.id === parseInt(id)) || null;
        } catch (error) {
            console.log({ error: 'producto no encontrado' });
        }
    }

    async getAll() {
        try {
            const productos = await fs.promises.readFile(
                this.nombre,
                (err, data) => data
            );
            return JSON.parse(productos);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, newProduct) {
        let lista = await this.getAll();
        const index = lista.findIndex(product => product.id == id);
        let product = lista[index];
        if (product) {
            const nuevaLista = lista.filter(product => product.id != id);
            nuevaLista.push({
                "id": parseInt(id),
                "producto": newProduct
            });
            nuevaLista.sort(function(a, b) {
                if (a.id > b.id) {
                    return 1;
                } else if (a.id < b.id) {
                    return -1;
                }
            })
            const nuevaListaJson = JSON.stringify(nuevaLista);
            await this.saveList(nuevaListaJson);
            return nuevaLista[index]
        } else {
            return null
        }
    }

    async deleteById(id) {
        try {
            const lista = await this.getAll();
            const producto = await this.getByID(id);
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
}

module.exports = ContenedorProductos