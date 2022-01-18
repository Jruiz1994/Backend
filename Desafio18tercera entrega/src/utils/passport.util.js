import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import passport from 'passport'
import { UserModel } from '../models/user.model.js'
import logger from './logger.util.js'

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password)
}

passport.use('login', new Strategy(
    (username, password, done) => {
        UserModel.findOne({ username }, (err, user) => {
            if (err) return done(err)
            if (!user) {
                logger.warn('Usuario no encontrado!')
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                logger.warn('Invalid password')
                return done(null, false)
            }
            return done(null, user)
        })
    }
))

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use('signup', new Strategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        UserModel.findOne({ username }, (err, user) => {
            if (err) return done(err)
            if (user) {
                logger.warn('El usuario existe!')
                return done(null, false)
            }
            const newUser = {
                username,
                password: createHash(password),
                email: req.body.email,
                name: req.body.name,
                address: req.body.address,
                telephone: req.body.telephone,
                age: req.body.age
            }

            UserModel.create(newUser, (err, user) => {
                if (err) return done(err)
                logger.info('Usuario creado')
                return done(null, user)
            })
        })
    }

))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id, done)
})

export default passport