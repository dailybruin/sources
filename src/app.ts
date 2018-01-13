import * as express from 'express';
import { Express } from 'express-serve-static-core';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.config();

import router from './routes';
import { notFoundHandler, errorHandler } from './errorHandling';

/** Create Express server */
const app: Express = express();

/** Logging */
app.use(logger('dev'));

/** Parse incoming request bodies */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Passport Initialization (for authentication) */
app.use(passport.initialize());
app.use(passport.session());

/** Routing */
app.use('/', router);
app.use(express.static('dist/views/static'));

/** Error Handling */
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
