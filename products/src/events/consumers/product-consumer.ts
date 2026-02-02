import { consumer } from "../../config/kafka";
import { ProductService } from "../../services/product-service";
import { orderProductMap } from "../../state/orders";

const productService = new ProductService();

export class ProductConsumer {
  static async start() {
    await consumer.subscribe({
      topics: ["order-created", "payment-created"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, message }: any) => {
        const data = JSON.parse(message.value?.toString() || "{}");
        console.log(`Product Service received event: ${topic}`, data);

        if (topic === "order-created") {
          // Store order -> product mapping
          // data structure is { id, productIds, status, ... }
          if (data.id && data.productIds) {
            orderProductMap.set(data.id, data.productIds);
            console.log(`Stored products for order ${data.id}`);
          }
        }

        if (topic === "payment-created") {
          // Reduce stock
          // data uses { orderId, status }
          const orderId = data.orderId;
          const productIds = orderProductMap.get(orderId);

          if (productIds) {
            console.log(
              `Reducing stock for order ${orderId}, items: ${productIds}`,
            );
            await productService.decreaseStock(productIds);

            // Clean up memory
            orderProductMap.delete(orderId);
          } else {
            console.log(
              `No products found for order ${orderId}, cannot reduce stock.`,
            );
          }
        }
      },
    });
  }
}
