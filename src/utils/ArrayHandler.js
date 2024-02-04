import productsData from './product.json';

export class ArrayHandler {
  constructor(productsData) {
    this.productsData = productsData;
  }

  findDollarId = (data) => {
    const dollarId = data.Valuta.Item.filter((valutaItem) => valutaItem.EngName === 'US Dollar')[0]['$']['ID'];
    return dollarId;
  };

  findDollarRate = (data, id) => {
    const dollarRate = data.ValCurs.Valute.filter((valutaItem) => valutaItem['$']['ID'] === id)[0]['Value'];
    return dollarRate;
  };

  setPrice(rate) {
    const formattedProductsData = this.productsData.products.map((product) => {
      const formattedProduct = { ...product };
      const price = formattedProduct.price;
      const formattedDiscountPercentage = (100 - formattedProduct.discountPercentage) / 100;
      const formattedRate = Number(rate.replace(',', '.'));
      const rateCoefficient = 1.1;
      formattedProduct.price_rub = Math.ceil(price * formattedRate * formattedDiscountPercentage * rateCoefficient);
      return formattedProduct;
    });

    this.productsData.products = formattedProductsData;

    return this.productsData;
  }
}

export const arrayHandler = new ArrayHandler(productsData);
