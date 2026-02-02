import { ProductRepository } from "../repositories/product-repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }
}
