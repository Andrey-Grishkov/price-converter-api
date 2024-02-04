import { rateApi } from '../utils/RateApi';
import { formattedDate } from '../utils/DataHandler';
import { arrayHandler, ArrayHandler } from '../utils/ArrayHandler';

class ProductController {
  setValue = (arrayHandler, req, res) => {
    // Get id USA dollar from currency list by name, because id changes
    rateApi
      .getDollarIdList()
      .then((currentIdList) => {
        const id = arrayHandler.findDollarId(currentIdList);

        // Then get rate USA dollar by id from rates list, that requested by current date
        rateApi
          .getRateList(formattedDate)
          .then((currentRate) => {
            const rate = arrayHandler.findDollarRate(currentRate, id);

            // Return product.json to user, where calculated russian ruble price
            res.json(arrayHandler.setPrice(rate));
          })
          .catch((err) => {
            res.status(500).send(`Ошибка: ${err}`);
          });
      })
      .catch((err) => {
        res.status(500).send(`Ошибка: ${err}`);
      });
  };

  getProduct = (req, res) => {
    this.setValue(arrayHandler, req, res);
  };

  postProduct = (req, res) => {
    const requestData = req.body;
    const arrayHandler = new ArrayHandler(requestData);
    this.setValue(arrayHandler, req, res);
  };
}

const productController = new ProductController();
export const getProductController = productController.getProduct;
export const postProductController = productController.postProduct;
