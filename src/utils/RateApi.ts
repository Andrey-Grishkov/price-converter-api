import fetch, { Response } from 'node-fetch';
import { parseString } from 'xml2js';
import { IDataId, IRateData } from '../types/interfaces.js';
import { RATE_URL, DOLLAR_ID_URL, HEADERS } from './constants.js';

class RateApi {
  private _headers: { 'Content-Type': string };
  private _rateUrl: string;
  private _dollarIdUrl: string;

  constructor(HEADERS: { 'Content-Type': string }, RATE_URL: string, DOLLAR_ID_URL: string) {
    this._headers = HEADERS;
    this._rateUrl = RATE_URL;
    this._dollarIdUrl = DOLLAR_ID_URL;
  }

  private _checkResponseId = (value: Response): Promise<IDataId> => {
    if (value.ok) {
      return new Promise((resolve, reject) => {
        value
          .text()
          .then((xmlText) => {
            parseString(xmlText, { explicitArray: false }, (err, result) => {
              if (err) {
                reject(`Error parsing XML: ${err}`);
              } else {
                resolve(result);
              }
            });
          })
          .catch((error) => {
            reject(`Error fetching XML: ${error}`);
          });
      });
    }
    return Promise.reject(`${value.status}`);
  };

  private _checkResponseRate = (value: Response): Promise<IRateData> => {
    if (value.ok) {
      return new Promise((resolve, reject) => {
        value
          .text()
          .then((xmlText) => {
            parseString(xmlText, { explicitArray: false }, (err, result) => {
              if (err) {
                reject(`Error parsing XML: ${err}`);
              } else {
                resolve(result);
              }
            });
          })
          .catch((error) => {
            reject(`Error fetching XML: ${error}`);
          });
      });
    }
    return Promise.reject(`${value.status}`);
  };

  public getDollarIdList = () => {
    return fetch(`${this._dollarIdUrl}`, {
      headers: this._headers,
    }).then(this._checkResponseId);
  };

  public getRateList = (formattedDate: string) => {
    return fetch(`${this._rateUrl}${formattedDate}`, {
      headers: this._headers,
    }).then(this._checkResponseRate);
  };
}

export const rateApi = new RateApi(HEADERS, RATE_URL, DOLLAR_ID_URL);
