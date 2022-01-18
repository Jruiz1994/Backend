import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { config } from './config.js'
import apiRouter from './routers/routes.js'
import passport from 'passport'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: config.SECRET,
    cookie: {
        maxAge: Number(config.EXPIRE)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRouter)

app.use('/uploads', express.static('public'))


export default app