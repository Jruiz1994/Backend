import dotenv from 'dotenv';
dotenv.config();

const { FACEBOOK_ID, FACEBOOK_SECRET } = process.env;

import passport from 'passport';

import { Strategy as FacebookStrategy } from 'passport-facebook'

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails'],
        scope: ['email']
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }
));

passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser((id, cb) => cb(null, id));

export default passport