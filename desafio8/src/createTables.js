import { db, dbsqlite } from './db.js'

async function createTableProds() {
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
                table.string('thumbnail', 2083).notNullable()
            })
        }
        console.log('tabla creada');
    } catch (error) {
        console.log(error);

    } finally {
        db.destroy()
    }
}

async function createTableMsgs() {
    try {
        const exist = await dbsqlite.schema.hasTable('mensajes');
        console.log(exist);
        if (!exist) {
            await dbsqlite.schema.createTable('mensajes', table => {
                table.increments('id').primary().notNullable()
                table.timestamp('timestamp').notNullable()
                table.string('user', 25).notNullable()
                table.string('text', 60).notNullable()
            })
        }
        console.log('tabla creada');
    } catch (error) {
        console.log(error);

    } finally {
        dbsqlite.destroy()
    }
}

createTableProds();
createTableMsgs();