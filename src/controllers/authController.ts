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
      if (profile._json.domain === 'media.ucla.edu') {
        const [user] = await User.findOrCreate({
          where: { id: String(profile.id) },
        });
        user.name = profile.displayName;
        await user.save();
        return done(null, user);
      } else {
        done(new Error('Invalid host domain.'));
      }
    }
  )
);

/**
 * Login Required middleware.
 */
export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
