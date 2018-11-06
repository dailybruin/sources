import * as passport from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'
import knex from '../models'

const callbackURL =
  process.env.NODE_ENV === 'production'
    ? 'http://sources.dailybruin.com/auth/google/callback'
    : 'http://localhost:3000/auth/google/callback'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await knex
    .table('Users')
    .returning(['id', 'name'])
    .where('id', id)
  done(null, user)
})

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Using the _json property isn't the nicest, but it seems to be the only way to get a user's domain
      if (profile._json.domain === 'media.ucla.edu') {
        let user = await knex('Users').where('id', profile.id)
        if (!user) {
          user = await knex('Users').insert({
            name: profile.displayName,
            id: profile.id,
          })
        }
        return done(null, user)
      } else {
        done(new Error('Invalid host domain.'))
      }
    }
  )
)

/**
 * Login Required middleware.
 */
export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
