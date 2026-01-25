import { producer } from "../../config/kafka";

export class ExpirationCompleteProducer {
  static async publish(data: { orderId: string }) {
    await producer.send({
      topic: "expiration-complete",
      messages: [{ value: JSON.stringify(data) }],
    });
  }
}
