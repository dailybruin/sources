import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import router from './routes';
import { notFoundHandler, errorHandler } from './errorHandling';

/** Create Express server */
const app = express();

/** Logging */
app.use(logger('dev'));

/** Parse incoming request bodies */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Routing */
app.use('/', router);
app.use(express.static('dist/views/static'));

/** Error Handling */
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
