import {Request, Response} from 'express';
import { rateApi } from '../utils/RateApi.js';
import { formattedDate } from '../utils/DataHandler.js';
import { arrayHandler, ArrayHandler } from '../utils/ArrayHandler.js';
import { IArrayHandler, IProductsData, IDataId, IRateData } from "../types/interfaces.js";

class ProductController {
  setValue = (arrayHandler: IArrayHandler, req: Request, res: Response) => {
    // Get id USA dollar from currency list by name, because id changes
    rateApi
      .getDollarIdList()
      .then((currentIdList: IDataId) => {
        const id = arrayHandler.findDollarId(currentIdList);

        // Then get rate USA dollar by id from rates list, that requested by current date
        rateApi
          .getRateList(formattedDate)
          .then((currentRate: IRateData) => {
            if (!id) throw new Error('id is undefined');
            const rate = arrayHandler.findDollarRate(currentRate, id);
            if (!rate) throw new Error('dollar rate is undefined');
            const productData = arrayHandler.setPrice(rate);
            // Return product.json to user, where calculated russian ruble price
              return res.json(productData);
          })
          .catch((err) => {
            res.status(500).send(`Ошибка: ${err}`);
          });
      })
      .catch((err) => {
        res.status(500).send(`Ошибка: ${err}`);
      });
  };

  getProduct = (req: Request, res: Response) => {
      this.setValue(arrayHandler, req, res);
  };

  postProduct = (req: Request, res: Response) => {
    const requestData: IProductsData = req.body as IProductsData;
    const arrayHandler = new ArrayHandler(requestData);
    this.setValue(arrayHandler, req, res);
  };
}

const productController = new ProductController();
export const getProductController = productController.getProduct;
export const postProductController = productController.postProduct;
