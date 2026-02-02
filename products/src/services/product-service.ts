import { ProductRepository } from "../repositories/product-repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async decreaseStock(productIds: string[]) {
    for (const id of productIds) {
      // Assuming 1 quantity per product ID occurrence or just 1 per ID if list is unique
      // For this demo, we just decrease by 1
      await this.productRepository.updateStock(id, 1);
    }
  }
}
