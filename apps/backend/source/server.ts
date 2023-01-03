import { join } from 'path';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressWinston from 'express-winston';

import { logger, expressLogConfiguration } from './shared/logger';
import { CommonRoutesConfig } from './shared/routes.config';
import { PostsRoutes } from './routes/v1/post';

let routes: Array<CommonRoutesConfig> = [];
const app: express.Application = express();
const server: http.Server = http.createServer(app);

const CLN_PORT = normalizePort(process.env.PORT || '3007');
const CLN_HOST = '127.0.0.1';

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

routes.push(new PostsRoutes(app));

app.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

// app.use('/', express.static(join(directoryName, '../..', 'frontend')));
// app.use((req: any, res, next) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken ? req.csrfToken() : (req.cookies && req.cookies._csrf) ? req.cookies._csrf : ''); // RTL Angular Frontend
//   res.setHeader('XSRF-TOKEN', req.csrfToken ? req.csrfToken() : (req.cookies && req.cookies._csrf) ? req.cookies._csrf : ''); // RTL Quickpay JQuery
//   res.sendFile(join(directoryName, '../..', 'frontend', 'index.html'));
// });

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
  handleApplicationErrors(err, res);
  next();
});

app.use(expressWinston.errorLogger(expressLogConfiguration));

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
