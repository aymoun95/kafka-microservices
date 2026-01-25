import { consumer } from "../../config/kafka";
import { ExpirationService } from "../../services/expiration-service";

const expirationService = new ExpirationService();

export class ExpirationConsumer {
  static async start() {
    await consumer.subscribe({
      topics: ["order-created", "payment-created"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, message }: any) => {
        const data = JSON.parse(message.value?.toString() || "{}");

        if (topic === "order-created") {
          await expirationService.startTimer(data.id);
        }

        if (topic === "payment-created") {
          await expirationService.cancelTimer(data.orderId);
        }
      },
    });
  }
}
