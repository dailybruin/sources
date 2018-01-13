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
      console.log(profile);
      const user = await User.findOrCreate({
        where: { id: String(profile.id) },
      });
      return done(null, user);
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

// export function redirectToAuthURL(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   passport.authenticate('google', {
//     scope: ['https://www.googleapis.com/auth/plus.login'],
//   });
// }

// export function authCallback(req: Request, res: Response, next: NextFunction) {
//   passport.authenticate('google', { failureRedirect: '/login' });

//   if (
//     !authURL.query ||
//     !Object.prototype.hasOwnProperty.call(authURL.query, 'code')
//   ) {
//     res.redirect('/login');
//   } else {
//     oauth2Client.getToken(authURL.query.code, (err, tokens) => {
//       // Now tokens contains an access_token and an optional refresh_token. Save them.
//       if (!err) {
//         oauth2Client.credentials = tokens; // See https://github.com/google/google-api-nodejs-client/issues/869
//         res.redirect('/');
//       }
//     });
//   }
// }
// export function ensureAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   Profile.userinfo.v2.me.get(
//     {
//       auth: oauth2Client,
//     },
//     (err, response) => {
//       if (err || response.hd !== 'media.ucla.edu') {
//         res.redirect('/login');
//       } else {
//         next();
//       }
//     }
//   );
// }
