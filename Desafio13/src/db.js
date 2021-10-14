import { config } from './config.js'
import { configsqlite } from './configsqlite.js'
import knex from 'knex'

// console.log(config);

export const db = knex(config)
export const dbsqlite = knex(configsqlite)