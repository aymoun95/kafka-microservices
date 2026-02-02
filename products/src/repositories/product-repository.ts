export interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: "1", title: "Product 1", price: 10, stock: 100 },
  { id: "2", title: "Product 2", price: 20, stock: 100 },
];

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return products;
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.stock -= quantity;
      console.log(`Updated stock for ${product.title}: ${product.stock}`);
    }
  }
}
