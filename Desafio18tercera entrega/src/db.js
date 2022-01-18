import mongoose from 'mongoose'
import { config } from './config.js'
import logger from './utils/logger.util.js'

mongoose.connect(
    config.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            logger.info('Connected to the database')
        } else {
            logger(err)
        }
    },
)

export default mongoose