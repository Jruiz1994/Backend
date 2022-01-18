import express from 'express'
import passport from '../utils/passport.util.js'
import { AuthControllers } from '../controllers/index.js'
import { upload } from '../utils/multer.util.js';

const userRouter = new express.Router()

userRouter.post('/login', passport.authenticate('login'), AuthControllers.login)
    .get('/failLogin', AuthControllers.getFailLogin)
    .post('/signup', upload.single('photo'), passport.authenticate('signup', { failureRedirect: '/failSignup' }), AuthControllers.signup)
    .get('/failSignup', AuthControllers.getFailSignup)
    .post('/logout', AuthControllers.logout)
    .get('/image', AuthControllers.getImage)
    .get('/user', AuthControllers.getUserData)


export default userRouter;