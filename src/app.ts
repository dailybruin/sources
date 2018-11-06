import * as express from 'express'
import * as logger from 'morgan'
import * as session from 'express-session'
import * as connectSessionKnex from 'connect-session-knex'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as favicon from 'serve-favicon'

const KnexSessionStore = connectSessionKnex(session)

dotenv.config()

import router from './routes'
import knex from './models'
import { notFoundHandler, errorHandler } from './errorHandling'

/** Create Express server */
const app = express()

const store = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'
})

/** Logging */
app.use(logger('dev'))

/** Parse incoming request bodies */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** Parse Cookies */
app.use(cookieParser())

/** Serve Favicon */
app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')))

/** Session Configuration with Sequelize */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store,
  })
)

/** Passport Initialization (for authentication) */
app.use(passport.initialize())
app.use(passport.session())

/** Routing */
app.use('/', router)
app.use(express.static('dist/views/static'))

/** Error Handling */
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
