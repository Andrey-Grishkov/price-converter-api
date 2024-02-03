const rateApi = require('../utils/RateApi');
const formattedDate = require('../utils/DataHandler');
const arrayHandler = require('../utils/ArrayHandler');
const fs = require('fs');

class ProductController {

  getProduct = (req, res) => {
    // Get id USA dollar from currency list by name, because id changes
    rateApi.getDollarIdList()
      .then(currentIdList => {
        const id = arrayHandler.findDollarId(currentIdList);

        // Then get rate USA dollar by id from rates list, that requested by current date
        rateApi.getRateList(formattedDate)
          .then(currentRate => {
            const rate = arrayHandler.findDollarRate(currentRate, id);

            // Return product.json to user, where calculated russian ruble price
            res.json(arrayHandler.setPrice(rate));
          })
          .catch(err => {
            res.status(500).send(`Ошибка: ${err}`);
          });
      })
      .catch(err => {
        res.status(500).send(`Ошибка: ${err}`);
      });
  }

  postProduct = (req, res) => {
    const requestData = req.body;
    res.json(requestData);
  }
}

const productController = new ProductController();
const getProductController = productController.getProduct;
const postProductController = productController.postProduct;
module.exports = {
  getProductController,
  postProductController
};
