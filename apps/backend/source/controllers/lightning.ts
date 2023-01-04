import { Request, Response, NextFunction } from 'express';
import handleError from '../shared/error-handler.js';
import { LNMessage, LightningService } from '../service/lightning.service.js';
import { logger } from '../shared/logger.js';
import { GetInfo } from '../models/lightning.js';

const lnMessage: LightningService = LNMessage;

class LightningController {
  async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Calling getinfo');
      let info: GetInfo = await lnMessage.getInfo();
      return res.status(200).json(info);
    } catch (error: any) {
      handleError(error, req, res);
    }
  }
}

export default new LightningController();
