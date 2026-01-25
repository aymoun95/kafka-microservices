import { Request, Response } from "express";
import { OrderService } from "../services/order-service";

const orderService = new OrderService();

export class OrderController {
  static async create(req: Request, res: Response) {
    const { productIds } = req.body;
    const order = await orderService.createOrder(productIds);
    res.status(201).send(order);
  }

  static async getAll(req: Request, res: Response) {
    const orders = await orderService.getAllOrders();
    res.send(orders);
  }
}
