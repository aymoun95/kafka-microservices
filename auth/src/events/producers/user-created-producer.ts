import { producer } from "../../config/kafka";

export class UserCreatedProducer {
  static async publish(data: { email: string; timestamp: Date }) {
    await producer.send({
      topic: "user-created",
      messages: [{ value: JSON.stringify(data) }],
    });
  }
}
