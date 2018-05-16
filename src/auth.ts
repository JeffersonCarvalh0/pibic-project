import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import config from './config';
import { IUser, UserModel } from './db/user.db';

// Set local strategy for authentication with username/password
passport.use(new LocalStrategy((username, password, done) => {
    UserModel.findOne({username: username, password: password})
    .then((user: IUser | null) => {
        if (!user) return done(null, false, { message: 'Invalid username or password.' });
        return done(null, user);
    })
    .catch((err: Error) => done(err));
}));

// Set local strategy for Json web tokens
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
}
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findOne({username: jwtPayload.username})
    .then((user: IUser | null) => {
        if (!user) return done(null, false, { message: 'Invalid username from the token.' });
        return done(null, user, { message: 'The token is valid.' });
    })
    .catch((err: Error) => done(err));
}));
