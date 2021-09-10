import { db } from "../db.js";

export async function createTable() {
    try {
        const exist = await db.schema.hasTable('personas');
        console.log(exist);
        if (!exist) {
            // crear tabla
            await db.schema.createTable('personas', table => {
                table.increments('id').primary().notNullable()
                table.string('name', 50).notNullable()
                table.string('lastName', 25).notNullable()
                table.integer('identificacion').notNullable()
            })
        }
        console.log('tabla creada');
    } catch (error) {
        console.log(error);

    } finally {
        db.destroy()
    }
}

export async function createProduct(data) {
    try {
        await db('productos').insert(data)
        return
    } catch (error) {
        throw new Error(error)
    }
}


export async function getProducts() {
    try {
        const productos = await db('productos').select()
        return productos
    } catch (error) {
        throw new Error(error)
    }
}


export async function deleteProducts(id) {
    try {
        await db('productos').del().where('id', id)
        return
    } catch (error) {
        throw new Error(error)
    }
}


export async function updateProducts(id, data) {
    try {
        await db('productos').update(data).where('id', id)
        return
    } catch (error) {
        throw new Error(error)
    }
}