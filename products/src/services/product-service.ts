import { Product, ProductRepository } from "../repositories/product-repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async createProduct(title: string, price: number) {
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      price,
    };
    return this.productRepository.create(product);
  }
}
