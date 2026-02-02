import { useCallback } from "react";
import { useOrders } from "./useOrders";

interface Order {
  id: string;
  productIds: string[];
  status: string;
}

export const useOrderWorkflow = (
  currentUser: any,
  clearCart: () => void,
  showNotification: (msg: string, duration?: number) => void,
  refreshProducts?: () => void,
) => {
  const onOrderExpired = useCallback(
    (order: Order) => {
      showNotification(
        `❌ ORDER ${order.id.slice(0, 4)} EXPIRED. Cart re-activated.`,
        5000,
      );
    },
    [showNotification],
  );

  const onOrderCompleted = useCallback(() => {
    clearCart();
    showNotification(`✅ Payment successful! Enjoy your items.`, 3000);
    if (refreshProducts) {
      refreshProducts();
    }
  }, [clearCart, showNotification, refreshProducts]);

  const { orders, fetchOrders } = useOrders(
    currentUser,
    onOrderExpired,
    onOrderCompleted,
  );

  return { orders, fetchOrders };
};
