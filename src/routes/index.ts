import { Router, Request, Response, NextFunction } from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

// import {
//   redirectToAuthURL,
//   authCallback,
//   ensureAuthenticated,
// } from '../controllers/authController';
import * as authController from '../controllers/authController';
import schema from './schema';

const router = Router();

/** Authentication */
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    hd: 'media.ucla.edu',
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: any, res) => {
    req.session.save(() => {
      res.redirect('/');
    });
  }
);

/** GraphQL */
router.use(
  '/graphql',
  authController.isAuthenticated,
  bodyParser.json(),
  graphqlExpress({ schema })
);

router.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

/** Main Pages */
// Login Page
router.get('/login', (req: Request, res: Response) => {
  res.sendFile('login.html', { root: './dist/views/static/' });
});

// Sources Page; ensure authentication; if not, send to login.
router.get(
  '/',
  authController.isAuthenticated,
  (req: Request, res: Response) => {
    res.sendFile('index.html', { root: './dist/views/static/' });
  }
);

export default router;
