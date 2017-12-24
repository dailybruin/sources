import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import * as authController from '../controllers/authController';
import { schema } from '../schema';

dotenv.config();
const router = express.Router();

/* Authentication */
router.get('/auth/google', authController.redirectToAuthURL);
router.get('/auth/google/callback', authController.authCallback);

/* GraphQL */
router.use(
  '/graphql',
  authController.ensureAuthenticated,
  bodyParser.json(),
  graphqlExpress({ schema })
);

if (process.env.NODE_ENV === 'development') {
  router.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    })
  );
}

// GET login page
router.get('/login', (req: Request, res: Response) => {
  res.sendFile(`login.html`, { root: './src/views/static/' });
});

// GET sources if logged in; if not, send to login.
router.get(
  '/',
  authController.ensureAuthenticated,
  (req: Request, res: Response) => {
    res.sendFile('index.html', { root: './src/views/static/' });
  }
);

export default router;
