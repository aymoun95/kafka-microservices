import { OrderCreatedProducer } from "../events/producers/order-created-producer";
import { Order, OrderRepository } from "../repositories/order-repository";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(userId: string, productIds: string[]) {
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      productIds,
      status: "created",
      expiresAt: new Date(new Date().getTime() + 15 * 60000), // 15 mins (though logic uses 15s delay currently)
    };

    await this.orderRepository.create(order);
    await OrderCreatedProducer.publish(order);

    return order;
  }

  async getAllOrders() {
    return this.orderRepository.findAll();
  }

  async updateStatus(orderId: string, status: string) {
    return this.orderRepository.updateStatus(orderId, status);
  }
}
