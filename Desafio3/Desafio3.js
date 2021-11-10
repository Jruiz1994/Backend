const express = require("express");

const app = express();

const fs = require("fs");
class Contenedor {
    constructor(nombre) {
        this.nombre = nombre, this.productos = [], this.id = 0;
    }

    async save(obj) {
        await this.getAll();
        this.id++;
        this.productos.push({
            id: this.id,
            producto: obj
        });
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(this.productos));
        } catch (error) {
            console.log(error);
        }
    }

    async getByID(id) {
        try {
            const productos = await this.getAll();
            return productos.find(producto => producto.id === id) || null;
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
}
const instancia = new Contenedor("productos.txt");
const test1 = {
    title: "iPhone X",
    price: 1000,
    thumbnail: "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP770/iphonex.png"
};
const test2 = {
    title: "iPhone 11",
    price: 1400,
    thumbnail: "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP770/iphone11.png"
};
const test3 = {
    title: "iPhone 14",
    price: 1400,
    thumbnail: "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP770/iphone11.png"
};
const test4 = {
    title: "iPhone 19",
    price: 1600,
    thumbnail: "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP770/iphone11.png"
};
async function CrearData() {
    await instancia.save(test1);
    await instancia.save(test2);
    await instancia.save(test3);
    await instancia.save(test4);
}
CrearData();

app.get("/productos", async(req, res) => {
    const datos = await instancia.getAll();
    res.send(datos);
});

app.get("/productoRandom", async(req, res) => {
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    const random = getRandomArbitrary(1, 4);
    console.log(random);
    const prod = await instancia.getByID(random);
    res.send(prod);
});



const port = 8080;

const server = app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
});

server.on("error", error => console.log(error));

async function test() {
    await instancia.getByID(24);
}
test();