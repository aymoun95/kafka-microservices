import { PaymentCreatedProducer } from "../events/producers/payment-created-producer";

export class PaymentService {
  async processPayment(orderId: string) {
    console.log("Payment service: processing payment for order:", orderId);

    await PaymentCreatedProducer.publish({
      orderId,
      status: "completed",
    });

    return { orderId, status: "completed" };
  }
}
