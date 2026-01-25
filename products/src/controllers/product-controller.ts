import { Request, Response } from "express";
import { ProductService } from "../services/product-service";

const productService = new ProductService();

export class ProductController {
  static async getAll(req: Request, res: Response) {
    const products = await productService.getAllProducts();
    res.send(products);
  }

  static async create(req: Request, res: Response) {
    const { title, price } = req.body;
    const product = await productService.createProduct(title, price);
    res.status(201).send(product);
  }
}
