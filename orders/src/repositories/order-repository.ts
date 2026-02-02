export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  status: string;
  expiresAt: Date;
}

const orders: Order[] = [];

export class OrderRepository {
  async create(order: Order): Promise<Order> {
    orders.push(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return orders;
  }

  async findById(id: string): Promise<Order | undefined> {
    return orders.find((o) => o.id === id);
  }

  async updateStatus(id: string, status: string): Promise<Order | undefined> {
    const order = orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      console.log(`Order ${id} repository: status updated to ${status}`);
    }
    return order;
  }
}
