import * as polyfills from './polyfills.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressWinston from 'express-winston';

import { logger, expressLogConfiguration } from './shared/logger.js';
import { CommonRoutesConfig } from './shared/routes.config.js';
import { LightningRoutes } from './routes/v1/lightning.js';
import { SharedRoutes } from './routes/v1/shared.js';

polyfills;
let directoryName = dirname(fileURLToPath(import.meta.url));
let routes: Array<CommonRoutesConfig> = [];
const app: express.Application = express();
const server: http.Server = http.createServer(app);

const CLN_PORT = normalizePort(process.env.PORT || '3007');
const CLN_HOST = process.env.HOST || '127.0.0.1';

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
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }));
app.use(cors());
app.use(expressWinston.logger(expressLogConfiguration));
app.use(expressWinston.errorLogger(expressLogConfiguration));

routes.push(new SharedRoutes(app));
routes.push(new LightningRoutes(app));

// serve frontend
app.use('/', express.static(join(directoryName, '..', '..', 'frontend', 'build')));
app.use((req: express.Request, res: express.Response, next: any) => {
  res.sendFile(join(directoryName, '..', '..', 'frontend', 'build', 'index.html'));
});

app.use((req: express.Request, res: express.Response, next: any) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
  handleApplicationErrors(err, res);
  next();
});

const onListening = () => {
  logger.info('Server running at http://' + CLN_HOST + ':' + CLN_PORT);
};

const onError = (error: any) => {
  logger.error('Server error: ' + error);
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      logger.error('http://' + CLN_HOST + ':' + CLN_PORT + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error('http://' + CLN_HOST + ':' + CLN_PORT + ' is already in use');
      process.exit(1);
      break;
    case 'ECONNREFUSED':
      logger.error('Server is down/locked');
      process.exit(1);
      break;
    case 'EBADCSRFTOKEN':
      logger.error('Form tempered');
      process.exit(1);
      break;
    default:
      logger.error('DEFUALT ERROR: ' + error.code);
      throw error;
  }
};

const handleApplicationErrors = (err: any, res: express.Response) => {
  switch (err.code) {
    case 'EACCES':
      logger.error('Server requires elevated privileges');
      res.status(406).send('Server requires elevated privileges.');
      break;
    case 'EADDRINUSE':
      logger.error('Server is already in use');
      res.status(409).send('Server is already in use.');
      break;
    case 'ECONNREFUSED':
      logger.error('Server is down/locked');
      res.status(401).send('Server is down/locked.');
      break;
    case 'EBADCSRFTOKEN':
      logger.error('Invalid CSRF token. Form tempered.');
      res.status(403).send('Invalid CSRF token, form tempered.');
      break;
    default:
      logger.error('DEFUALT ERROR: ' + JSON.stringify(err));
      res.status(400).send(JSON.stringify(err));
      break;
  }
};

server.on('error', onError);
server.on('listening', onListening);

server.listen({ port: CLN_PORT, host: CLN_HOST });
