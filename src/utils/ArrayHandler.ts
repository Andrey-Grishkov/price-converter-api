import productsData from './product.json';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  price_rub?: number | null; // Making price_rub optional
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface IProductsData {
  products: IProduct[];
}

interface IRateResponse {
  ValCurs: {
    Date: string;
    name: string;
    Valute: {
      ID: string;
      NumCode: string;
      CharCode: string;
      Nominal: string;
      Name: string;
      Value: string;
      VunitRate: string;
    }[];
  };
}

interface IResponseId {
  Valuta: {
    name: string;
    Item: {
      ID: string;
      Name: string;
      EngName: string;
      Nominal: string;
      ParentCode: string;
    }[];
  };
}

export class ArrayHandler {
  public productsData: IProductsData;

  constructor(productsData: IProductsData) {
    this.productsData = productsData;
  }

  findDollarId = (data: IResponseId) => {
    const dollarId: string | undefined = data.Valuta.Item.filter((valutaItem) => valutaItem.EngName === 'US Dollar')[0]['$']?.ID;
    return dollarId;
  };

  findDollarRate = (data: IRateResponse, id: string) => {
    const dollarRate: string | undefined = data.ValCurs.Valute.filter((valutaItem) => valutaItem['$']['ID'] === id)[0]['Value'];
    return dollarRate;
  };

  setPrice(rate: string) {
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
