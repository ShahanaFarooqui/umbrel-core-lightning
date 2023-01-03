export enum Environment {
  PRODUCTION = 'production',
  TESTING = 'testing',
  DEVELOPMENT = 'development'
}

export const API_VERSION = '/v1';
export const NODE_ENV: Environment = Environment.DEVELOPMENT;
export const LOG_FILE = './dist/logs/cln-backend-' + new Date().toISOString() + '.log';
