import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { Request, Response, NextFunction } from 'express';

import { User } from '../models';

const callbackURL =
  process.env.PRODUCTION === 'true'
    ? 'http://sources.dailybruin.com/auth/google/callback'
    : 'http://localhost:3000/auth/google/callback';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('hi');
      const [user] = await User.findOrCreate({
        where: { id: String(profile.id) },
      });
      console.log(user);
      return done(null, user);
    }
  )
);

/**
 * Login Required middleware.
 */
export function isAuthenticated(req, res, next) {
  console.log(req);
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
