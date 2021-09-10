import { config } from './config.js'
import knex from 'knex'

// console.log(config);

export const db = knex(config)