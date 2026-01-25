import { consumer } from "../../config/kafka";

export class OrderCreatedConsumer {
  static async start() {
    await consumer.subscribe({ topic: "order-created", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }: any) => {
        const order = JSON.parse(message.value?.toString() || "{}");
        console.log(
          "Payment service: received order creation notification for",
          order.id,
        );
      },
    });
  }
}
