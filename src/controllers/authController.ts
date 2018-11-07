import * as passport from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'
import knex from '../models'

const callbackDomain =
  process.env.NODE_ENV === 'production'
    ? 'https://sources.dailybruin.com'
    : process.env.NODE_ENV === 'staging'
      ? 'https://db-sources-staging.herokuapp.com'
      : 'http://localhost:3000'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await knex
      .table('Users')
      .returning(['id', 'name'])
      .where('id', id)
    done(null, user)
  } catch (e) {
    done(e, null)
  }
})

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL: `${callbackDomain}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Using the _json property isn't the nicest, but it seems to be the only way to get a user's domain
      if (
        profile._json.domain === 'media.ucla.edu' ||
        process.env.NODE_ENV === 'staging'
      ) {
        let user
        try {
          user = await knex('Users')
            .where('id', profile.id)
            .first()
          if (!user) {
            await knex('Users').insert({
              name: profile.displayName,
              id: profile.id,
            })
          }
        } catch (e) {
          return done(e, null)
        }
        return done(null, profile)
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
  console.log('authenticate')
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
