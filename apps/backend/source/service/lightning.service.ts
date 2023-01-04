import Lnmessage from 'lnmessage';
import { LightningError } from '../models/errors.js';
import { GetInfo } from '../models/lightning.js';
import { HttpStatusCode } from '../shared/consts.js';
import { logger } from '../shared/logger.js';

export class LightningService {
  private ln: any = null;

  constructor() {
    this.connect();
  }

  connect = () => {
    console.warn('Start');
    console.warn(crypto);
    this.ln = new Lnmessage({
      remoteNodePublicKey: '02f4df91118f943f07af246282f4af3c9dab08ed176980def21215070c457ba2b9',
      wsProxy: 'ws://127.0.0.1:5001',
      ip: '127.0.0.1',
      port: 19846,
      privateKey: 'ea8d3091934f2c86c216370f0206acaaa2ee12462387743c358ca5f0245bf561',
      logger: {
        info: console.log,
        warn: console.warn,
        error: console.error
      }
    });
    console.warn('INIT');
  };

  getInfo = async () => {
    return this.ln
      .commando({
        method: 'getinfo',
        params: [],
        rune: 'SnG46kWc3a3qJPcEl0CDvIHsShYqIavwDLAcnQ3qRlM9MQ=='
      })
      .then((commandRes: any) => {
        logger.info('Command Res: ' + JSON.stringify(commandRes));
        return Promise.resolve(commandRes);
      })
      .catch((err: any) => {
        logger.error('Lightning error from getinfo command');
        Promise.reject(new LightningError(err));
      });
  };
}

export const LNMessage = new LightningService();
