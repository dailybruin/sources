import { Router, Request, Response, NextFunction } from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import {
  redirectToAuthURL,
  authCallback,
  ensureAuthenticated,
} from '../controllers/authController';
import schema from './schema';

dotenv.config();
const router = Router();

/** Authentication */
router.get('/auth/google', redirectToAuthURL);
router.get('/auth/google/callback', authCallback);

/** GraphQL */
router.use(
  '/graphql',
  // ensureAuthenticated,
  bodyParser.json(),
  graphqlExpress({ schema })
);

// if (process.env.NODE_ENV === 'development') {
router.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);
// }

/** Main Pages */
// Login Page
router.get('/login', (req: Request, res: Response) => {
  res.sendFile('login.html', { root: './dist/views/static/' });
});

// Sources Page; ensure authentication; if not, send to login.
router.get('/', ensureAuthenticated, (req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/views/static/' });
});

export default router;
