import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';

import { logger, expressLogConfiguration } from './shared/logger.js';
import { CommonRoutesConfig } from './shared/routes.config.js';
import { LightningRoutes } from './routes/v1/lightning.js';
import { SharedRoutes } from './routes/v1/shared.js';
import { APIError } from './models/errors.js';
import { Environment, APP_CONSTANTS } from './shared/consts.js';
import handleError from './shared/error-handler.js';

let directoryName = dirname(fileURLToPath(import.meta.url));
let routes: Array<CommonRoutesConfig> = [];

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const CLN_PORT = normalizePort(process.env.PORT || '3007');
const CLN_HOST = process.env.HOST || 'localhost';

function normalizePort(val: string) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

app.set('trust proxy', true);
app.use(cookieParser());
app.use(
  csurf({
    cookie: {
      key: '_csrf',
      httpOnly: true,
      secure: true,
      maxAge: 3600,
    },
  }),
);
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; frame-src 'self'; style-src 'self';",
  );
  next();
});
const corsOptions = {
  methods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  origin:
    APP_CONSTANTS.APPLICATION_MODE === Environment.DEVELOPMENT
      ? 'http://' + CLN_HOST + ':4300'
      : 'http://' + CLN_HOST + ':' + CLN_PORT,
  credentials: true,
  allowedHeaders: 'Content-Type, X-XSRF-TOKEN',
};
app.use(cors(corsOptions));

app.use(expressWinston.logger(expressLogConfiguration));
app.use(expressWinston.errorLogger(expressLogConfiguration));

routes.push(new SharedRoutes(app));
routes.push(new LightningRoutes(app));

// serve frontend
app.use('/', express.static(join(directoryName, '..', '..', 'frontend', 'build')));
app.use((req: express.Request, res: express.Response, next: any) => {
  res.sendFile(join(directoryName, '..', '..', 'frontend', 'build', 'index.html'));
});

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
  return handleError(throwApiError(err), req, res, next);
});

const throwApiError = (err: any) => {
  logger.error('Server error: ' + err);
  switch (err.code) {
    case 'EACCES':
      return new APIError(
        'http://' + CLN_HOST + ':' + CLN_PORT + ' requires elevated privileges',
        'http://' + CLN_HOST + ':' + CLN_PORT + ' requires elevated privileges',
        406,
        'http://' + CLN_HOST + ':' + CLN_PORT + ' requires elevated privileges',
      );
    case 'EADDRINUSE':
      return new APIError(
        'http://' + CLN_HOST + ':' + CLN_PORT + ' is already in use',
        'http://' + CLN_HOST + ':' + CLN_PORT + ' is already in use',
        409,
        'http://' + CLN_HOST + ':' + CLN_PORT + ' is already in use',
      );
    case 'ECONNREFUSED':
      return new APIError(
        'Server is down/locked',
        'Server is down/locked',
        401,
        'Server is down/locked',
      );
    case 'EBADCSRFTOKEN':
      return new APIError(
        'Invalid CSRF token. Form tempered.',
        'Invalid CSRF token. Form tempered.',
        403,
        'Invalid CSRF token. Form tempered.',
      );
    default:
      return new APIError(
        'Default: ' + JSON.stringify(err),
        'Default: ' + JSON.stringify(err),
        400,
        'Default: ' + JSON.stringify(err),
      );
  }
};

server.on('error', throwApiError);
server.on('listening', () => logger.info('Server running at http://' + CLN_HOST + ':' + CLN_PORT));
server.listen({ port: CLN_PORT, host: CLN_HOST });
