import { producer } from "../../config/kafka";

export class OrderCreatedProducer {
  static async publish(data: any) {
    await producer.send({
      topic: "order-created",
      messages: [{ value: JSON.stringify(data) }],
    });
  }
}
