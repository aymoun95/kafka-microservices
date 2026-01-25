import { producer } from "../../config/kafka";

export class PaymentCreatedProducer {
  static async publish(data: { orderId: string; status: string }) {
    await producer.send({
      topic: "payment-created",
      messages: [{ value: JSON.stringify(data) }],
    });
  }
}
