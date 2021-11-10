import { Router } from 'express';

import passport from '../utils/passport.utils.js';

const passportRouter = Router();

passportRouter
    .get('/facebook', passport.authenticate('facebook'))
    .get('/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/products',
        failureRedirect: '/login'
    }));

export default passportRouter