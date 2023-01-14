import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';

import { SETTINGS_FILE_PATH } from '../shared/consts.js';
import { logger } from '../shared/logger.js';
import handleError from '../shared/error-handler.js';

class SharedController {
  getApplicationSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Application Settings');
      res.status(200).json(JSON.parse(fs.readFileSync(SETTINGS_FILE_PATH, 'utf-8')));
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }

  setApplicationSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Updating Application Settings: ' + JSON.stringify(req.body));
      fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(req.body, null, 2), 'utf-8');
      res.status(201).json({ message: 'Application Settings Updated Successfully' });
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }
}

export default new SharedController();
