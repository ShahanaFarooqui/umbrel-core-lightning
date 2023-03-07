import axios from 'axios';
import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';

import { APP_CONSTANTS, FIAT_RATE_API, FIAT_VENUES } from '../shared/consts.js';
import { logger } from '../shared/logger.js';
import handleError from '../shared/error-handler.js';
import { APIError } from '../models/errors.js';

class SharedController {
  getApplicationSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Application Settings');
      res.status(200).json(JSON.parse(fs.readFileSync(APP_CONSTANTS.JSON_STORE_FILE, 'utf-8')));
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }

  setApplicationSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Updating Application Settings: ' + JSON.stringify(req.body));
      fs.writeFileSync(APP_CONSTANTS.JSON_STORE_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
      res.status(201).json({ message: 'Application Settings Updated Successfully' });
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }

  getFiatRate(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Fiat Rate for: ' + req.params.fiatCurrency);
      const FIAT_VENUE = FIAT_VENUES.hasOwnProperty(req.params.fiatCurrency)
        ? FIAT_VENUES[req.params.fiatCurrency]
        : 'COINGECKO';
      return axios
        .get(FIAT_RATE_API + FIAT_VENUE + '/pairs/XBT/' + req.params.fiatCurrency)
        .then((response: any) => {
          logger.info('Fiat Response: ' + JSON.stringify(response.data));
          if (response.data.rate) {
            return res.status(200).json({ venue: FIAT_VENUE, rate: response.data.rate });
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
