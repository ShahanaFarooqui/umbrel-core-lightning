import axios from 'axios';
import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';

import { SETTINGS_FILE_PATH } from '../shared/consts.js';
import { logger } from '../shared/logger.js';
import handleError from '../shared/error-handler.js';
import { APIError } from '../models/errors.js';

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

  getFiatRate(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Fiat Rate for: ' + req.params.fiatCurrency);
      return axios
        .get(
          'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=' + req.params.fiatCurrency,
        )
        .then((response: any) => {
          logger.info('Fiat Rate Response: ' + JSON.stringify(response.data));
          if (response.data[req.params.fiatCurrency]) {
            return res.status(200).json(response.data[req.params.fiatCurrency]);
          } else {
            return handleError(new APIError('Price Not Found', 'Price Not Found'), req, res, next);
          }
        })
        .catch(err => {
          return handleError(err, req, res, next);
        });
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }
}

export default new SharedController();
