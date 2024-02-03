const { parseString } = require('xml2js');
const { RATE_URL, DOLLAR_ID_URL, HEADERS } = require('./constants')

class RateApi {
  constructor(HEADERS, RATE_URL, DOLLAR_ID_URL) {
    this.headers = HEADERS;
    this.rateUrl = RATE_URL;
    this.dollarIdUrl = DOLLAR_ID_URL;
  }

  _checkResponse(res) {
    if (res.ok) {
      return new Promise((resolve, reject) => {
        res.text()
          .then(xmlText => {
            parseString(xmlText, {explicitArray: false}, (err, result) => {
              if (err) {
                reject(`Error parsing XML: ${err}`);
              } else {
                resolve(result);
              }
            });
          })
          .catch(error => {
            reject(`Error fetching XML: ${error}`);
          });
      });
    }
    return Promise.reject(`${res.status}`);
  }

  getDollarIdList = () => {
    return fetch(`${this.dollarIdUrl}`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getRateList = (formattedDate) => {
    return fetch(`${this.rateUrl}${formattedDate}`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }
}

const rateApi = new RateApi(HEADERS, RATE_URL, DOLLAR_ID_URL);

module.exports = rateApi;
