import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

import config from './config'
import { IUser, UserModel } from './db/user.db'

// Set local strategy for authentication with username/password
passport.use(
  new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username })
      .then((user: IUser | null) => {
        if (!user) {
          return done(null, false, { message: 'Invalid username' })
        }
        user.compare(password, (err: Error, isMatch: boolean) => {
          if (err) {
            throw err
          }
          if (!isMatch) {
            return done(null, false, { message: 'Invalid password' })
          }
          return done(null, user, { message: 'Successfully authenticated' })
        })
      })
      .catch((err: Error) => done(err))
  }),
)

// Set local strategy for Json web tokens
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET,
}
passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findById(jwtPayload.id)
      .then((user: IUser | null) => {
        if (!user) {
          return done(null, false, { message: 'Invalid id from the token' })
        }
        return done(null, user, { message: 'Successfully authenticated' })
      })
      .catch((err: Error) => done(err))
  }),
)
