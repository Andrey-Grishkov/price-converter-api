import {IProduct, IProductsData, IDataId, IRateData} from "../types/interfaces.js";
import productsData from './product.json' assert { type: "json" };

export class ArrayHandler {
  public productsData: IProductsData;

  constructor(productsData: IProductsData) {
    this.productsData = productsData;
  }

  findDollarId = (data: IDataId) => {
    const dollarId: string | undefined = data.Valuta.Item.filter(valutaItem => valutaItem.EngName === 'US Dollar')[0]['$']['ID'];
    return dollarId;
  };

  findDollarRate = (data: IRateData, id: string) => {
    const dollarRate: string | undefined = data.ValCurs.Valute.filter((valutaItem) => valutaItem['$']['ID'] === id)[0]['Value'];
    return dollarRate;
  };

  setPrice(rate: string) {
    const formattedProductsData = this.productsData.products.map((product: IProduct) => {
      const formattedProduct = { ...product };
      const price: number = formattedProduct.price;
      const formattedDiscountPercentage: number = (100 - formattedProduct.discountPercentage) / 100;
      const formattedRate: number = Number(rate.replace(',', '.'));
      const rateCoefficient: number = 1.1;
      formattedProduct.price_rub = Math.ceil(price * formattedRate * formattedDiscountPercentage * rateCoefficient);
      return formattedProduct;
    });

    this.productsData.products = formattedProductsData;

    return this.productsData;
  }
}

export const arrayHandler = new ArrayHandler(productsData);
