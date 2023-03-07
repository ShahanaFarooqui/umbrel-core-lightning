import * as crypto from 'crypto';
import Lnmessage from 'lnmessage';
import { LightningError } from '../models/errors.js';
import { Environment, HttpStatusCode, APP_CONSTANTS } from '../shared/consts.js';
import { logger } from '../shared/logger.js';

export class LightningService {
  private lnMessage: any = null;

  constructor() {
    this.lnMessage = new Lnmessage({
      remoteNodePublicKey: APP_CONSTANTS.NODE_PUBKEY,
      wsProxy: 'ws://' + APP_CONSTANTS.LIGHTNING_HOST + ':' + APP_CONSTANTS.LIGHTNING_WEBSOCKET_PORT,
      ip: APP_CONSTANTS.LIGHTNING_HOST,
      port: +APP_CONSTANTS.LIGHTNING_WEBSOCKET_PORT,
      privateKey: crypto.randomBytes(32).toString('hex'),
      logger: {
        info: APP_CONSTANTS.APPLICATION_MODE === Environment.DEVELOPMENT ? console.info : () => {},
        warn: APP_CONSTANTS.APPLICATION_MODE === Environment.DEVELOPMENT ? console.warn : () => {},
        error: console.error,
      },
    });
    this.lnMessage.connect();
  }

  call = async (method: string, methodParams: any[]) => {
    return this.lnMessage
      .commando({
        method: method,
        params: methodParams,
        rune: APP_CONSTANTS.LIGHTNING_RUNE,
      })
      .then((commandRes: any) => {
        logger.info('Command Res for ' + method + ': ' + JSON.stringify(commandRes));
        return Promise.resolve(commandRes);
      })
      .catch((err: any) => {
        logger.error('Lightning error from ' + method + ' command');
        if (typeof err === 'string') {
          logger.error(err);
          throw new LightningError(err, err, HttpStatusCode.CLN_SERVER, 'Core Lightning API Error');
        } else {
          logger.error(JSON.stringify(err));
          throw new LightningError(
            err.message || err.error,
            err.error || err.message,
            HttpStatusCode.CLN_SERVER,
            'Core Lightning API Error',
          );
        }
      });
  };
}

export const LNMessage = new LightningService();
