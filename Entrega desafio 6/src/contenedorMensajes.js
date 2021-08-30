const fs = require("fs");
class ContenedorMensajes {
    constructor(file) { this.file = file }

    async save(obj) {
        const lista = await this.getAll();
        let newId;
        if (lista.length == 0) {
            newId = 1
        } else {
            newId = lista[lista.length - 1].id + 1
        }
        const newMsg = {...obj, id: newId };
        lista.push(newMsg);
        const nuevaLista = JSON.stringify(lista, null, 2);
        try {
            await fs.writeFile(this.file, nuevaLista);
            return newId
        } catch (error) {
            throw new Error(`Error al guardar lista: ${error}`)
        }
    }

    async getAll() {
        try {
            const lista = await fs.readFile(this.file, 'utf-8');
            return JSON.parse(lista)
        } catch (error) {
            return []
        }
    }
}

module.exports = ContenedorMensajes