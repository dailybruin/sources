require('dotenv').config();
const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');

const authController = require('../controllers/authController');
const schema = require('../schema');

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
router.get('/login', (req, res) => {
  res.sendFile(`login.html`, { root: './src/views/static/' });
});

// GET sources if logged in; if not, send to login.
router.get('/', authController.ensureAuthenticated, (req, res) => {
  res.sendFile('index.html', { root: './src/views/static/' });
});

module.exports = router;
