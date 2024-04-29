type Product = {
  id: string;
  name: string;
  data: string;
};

class Series {
  readonly name: string;
  private products: Array<Product>;

  constructor(name: string, products: Array<Product>) {
    this.name = name;
    this.products = products;
  }

  getProducts(searchString?: string): Array<Product> {
    return this.products;
  }
}

class Company {
  readonly name: string;
  private series: Array<Series>;

  constructor(name: string, series: Array<Series>) {
    this.name = name;
    this.series = series;
  }

  getSeries(searchString?: string): Array<Series> {
    return this.series;
  }
}

export { Product, Series, Company };
