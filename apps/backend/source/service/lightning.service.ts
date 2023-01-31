import Lnmessage from 'lnmessage';
import { LightningError } from '../models/errors.js';
import {
  COMMANDO_IP,
  COMMANDO_PORT,
  COMMANDO_PRIVATE_KEY,
  COMMANDO_PUBKEY,
  COMMANDO_RUNE,
  COMMANDO_WS_PROXY,
  HttpStatusCode,
} from '../shared/consts.js';
import { logger } from '../shared/logger.js';

export class LightningService {
  private lnMessage: any = null;

  constructor() {
    this.lnMessage = new Lnmessage({
      remoteNodePublicKey: COMMANDO_PUBKEY,
      wsProxy: COMMANDO_WS_PROXY,
      ip: COMMANDO_IP,
      port: COMMANDO_PORT,
      privateKey: COMMANDO_PRIVATE_KEY,
      logger: {
        info: console.log,
        warn: console.warn,
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
        rune: COMMANDO_RUNE,
      })
      .then((commandRes: any) => {
        logger.info('Command Res for ' + method + ': ' + JSON.stringify(commandRes));
        return Promise.resolve(commandRes);
      })
      .catch((err: any) => {
        logger.error('Lightning error from ' + method + ' command');
        logger.error(JSON.stringify(err));
        throw new LightningError(
          err.message,
          err.error || err.message,
          HttpStatusCode.CLN_SERVER,
          'Core Lightning API Error',
        );
      });
  };
}

export const LNMessage = new LightningService();
