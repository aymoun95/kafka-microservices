import { consumer } from "../../config/kafka";
import { sendToUser } from "../../config/sse";
import { OrderService } from "../../services/order-service";

const orderService = new OrderService();

export class OrderStatusConsumer {
  static async start() {
    await consumer.subscribe({
      topics: ["payment-created", "expiration-complete"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, message }: any) => {
        const data = JSON.parse(message.value?.toString() || "{}");
        console.log(
          `Orders service: received ${topic} for order ${data.orderId}`,
        );

        let status = "";
        if (topic === "payment-created") {
          status = "completed";
        } else if (topic === "expiration-complete") {
          status = "cancelled";
        }

        if (status) {
          const order = await orderService.updateStatus(data.orderId, status);
          if (order) {
            sendToUser(order.userId, { orderId: data.orderId, status });
          }
        }
      },
    });
  }
}
