export interface Product {
  id: string;
  title: string;
  price: number;
}

const products: Product[] = [
  { id: "1", title: "Product 1", price: 10 },
  { id: "2", title: "Product 2", price: 20 },
];

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return products;
  }

  async create(product: Product): Promise<Product> {
    products.push(product);
    return product;
  }
}
