import dotenv from 'dotenv';
dotenv.config();
const { FACEBOOK_ID, FACEBOOK_SECRET } = process.env;
import passport from 'passport'


import { Strategy } from 'passport-facebook';

passport.use(new Strategy({
    clientID: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'photos'],
    scope: ['email']
}, (accessToken, refreshToken, userProfile, done) => {
    return done(null, userProfile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((id, done) => {
    done(null, id)
})
export default passport;