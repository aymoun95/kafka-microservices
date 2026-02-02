import { useCallback, useEffect, useState } from "react";
import { API_BASE_URLS } from "../constants";

interface Order {
  id: string;
  productIds: string[];
  status: string;
}

export const useOrders = (
  currentUser: any,
  onOrderExpired: (order: Order) => void,
  onOrderCompleted: (order: Order) => void,
) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(API_BASE_URLS.ORDERS);
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error("Fetch orders failed", e);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  useEffect(() => {
    if (!currentUser) return;

    const eventSource = new EventSource(`${API_BASE_URLS.ORDERS}/events`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setOrders((prevOrders) => {
        const order = prevOrders.find((o) => o.id === data.orderId);
        if (!order) return prevOrders;

        if (data.status === "completed") {
          onOrderCompleted(order);
        } else if (data.status === "cancelled") {
          onOrderExpired(order);
        }

        return prevOrders.map((o) =>
          o.id === data.orderId ? { ...o, status: data.status } : o,
        );
      });
    };

    eventSource.onerror = () => eventSource.close();
    return () => eventSource.close();
  }, [currentUser, onOrderExpired, onOrderCompleted]);

  return { orders, fetchOrders };
};
