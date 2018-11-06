import { Router, Request, Response, NextFunction } from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'

import { isAuthenticated } from '../controllers/authController'
import schema from './schema'

const router = Router()

/** Authentication */
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    hd: 'media.ucla.edu',
  })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: any, res) => {
    req.session.save(() => {
      res.redirect('/')
    })
  }
)

/** GraphQL */
router.use(
  '/graphql',
  isAuthenticated,
  bodyParser.json(),
  graphqlExpress({ schema })
)

if (process.env.NODE_ENV !== 'production') {
  router.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    })
  )
}

/** Main Pages */
// Login Page
router.get('/login', (req: Request, res: Response) => {
  res.sendFile('login.html', { root: './dist/views/static/' })
})

// Sources Page; requires authentication
router.get('/', isAuthenticated, (req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/views/static/' })
})

export default router
