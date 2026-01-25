import { Request, Response } from "express";
import { PaymentService } from "../services/payment-service";

const paymentService = new PaymentService();

export class PaymentController {
  static async pay(req: Request, res: Response) {
    const { orderId } = req.body;
    const result = await paymentService.processPayment(orderId);
    res.send({ message: "Payment processed", ...result });
  }
}
