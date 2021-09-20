import emoji from 'node-emoji'
import './db.js'
import { app } from './app.js'

app.listen(process.env.PORT, () => console.log(emoji.get('computer'), `Server started on port ${process.env.PORT}`))