import Lnmessage from 'lnmessage';
import {
  COMMANDO_IP,
  COMMANDO_PORT,
  COMMANDO_PRIVATE_KEY,
  COMMANDO_PUBKEY,
  COMMANDO_RUNE,
  COMMANDO_WS_PROXY,
} from '../utilities/constants';

export class LNMessageService {
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
        error: console.error
      }
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
        console.log('Command Res for ' + method + ': ' + JSON.stringify(commandRes));
        return Promise.resolve(commandRes);
      })
      .catch((err: any) => {
        console.error('Lightning error from ' + method + ' command');
        console.error(JSON.stringify(err));
        throw err;
      });
  };
}

export const LNMessageClient = new LNMessageService();
