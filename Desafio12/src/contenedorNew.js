// const { promises: fs } = require('fs');
import { db, dbsqlite } from './db.js'


class Contenedor {

    // constructor(file) { this.file = file }


    async getAll() {
        try {
            const productos = await db.select().from('productos');
            return productos
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllMessages() {
        try {
            const mensajes = await dbsqlite.select().from('mensajes');
            return mensajes
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const productos = await db.select().from('productos').where('id', id)
            return productos
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveProduct(data) {
        try {
            await db.from('productos').insert(data)
            return
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveMessage(data) {
        try {
            await dbsqlite.from('mensajes').insert(data)
            return
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id) {
        try {
            await db.from('productos').del().where('id', id)
            return
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProducts(id, data) {
        try {
            await db.from('productos').update(data).where('id', id)
            return
        } catch (error) {
            throw new Error(error)
        }
    }
}
export default Contenedor;