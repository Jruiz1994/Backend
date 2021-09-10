// const { promises: fs } = require('fs');
import { db } from './db.js'


class Contenedor {

    // constructor(file) { this.file = file }

    async createTableProds() {
        try {
            const exist = await db.schema.hasTable('productos');
            console.log(exist);
            if (!exist) {
                await db.schema.createTable('productos', table => {
                    table.increments('id').primary().notNullable()
                    table.timestamp('timestamp').notNullable()
                    table.string('title', 25).notNullable()
                    table.string('description', 60).notNullable()
                    table.string('code', 10).notNullable()
                    table.integer('price').notNullable()
                    table.integer('stock').notNullable()
                    table.string('thumnail', 2083).notNullable()
                })
            }
            console.log('tabla creada');
        } catch (error) {
            console.log(error);

        } finally {
            db.destroy()
        }
    }

    async createTableMsgs() {
        try {
            const exist = await db.schema.hasTable('mensajes');
            console.log(exist);
            if (!exist) {
                await db.schema.createTable('mensajes', table => {
                    table.increments('id').primary().notNullable()
                    table.timestamp('timestamp').notNullable()
                    table.string('user', 25).notNullable()
                    table.string('message', 60).notNullable()
                })
            }
            console.log('tabla creada');
        } catch (error) {
            console.log(error);

        } finally {
            db.destroy()
        }
    }

    async getAll() {
        try {
            const productos = await db('productos').select()
            return productos
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllMessages() {
        try {
            const mensajes = await db('mensajes').select()
            return mensajes
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const productos = await db('productos').select().where('id', id)
            return productos
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveProduct(data) {
        try {
            await db('productos').insert(data)
            return
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveMessage(data) {
        try {
            await db('mensajes').insert(data)
            return
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id) {
        try {
            await db('productos').del().where('id', id)
            return
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProducts(id, data) {
        try {
            await db('productos').update(data).where('id', id)
            return
        } catch (error) {
            throw new Error(error)
        }
    }
}
export default Contenedor;