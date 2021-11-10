import mongoose from 'mongoose'
import emoji from 'node-emoji'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(
    process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.log(emoji.get('fire'), 'Connected to the database')
        } else {
            console.log(err)
        }
    },
)

export default mongoose