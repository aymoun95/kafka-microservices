import { useState } from "react";
import { API_BASE_URLS } from "../constants";

interface Product {
  id: string;
  title: string;
  price: number;
}

export const useCheckout = (
  cartItems: Product[],
  fetchOrders: () => void,
  showNotification: (msg: string) => void,
) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingOrderIdToPay, setPendingOrderIdToPay] = useState<string | null>(
    null,
  );
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  const onCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsOrdering(true);
    setLastOrderTotal(cartItems.reduce((s, i) => s + i.price, 0));

    try {
      const response = await fetch(API_BASE_URLS.ORDERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: cartItems.map((i) => i.id) }),
      });
      const order = await response.json();
      fetchOrders();
      setPendingOrderIdToPay(order.id);
      setIsPaymentModalOpen(true);
    } catch (e) {
      showNotification("Checkout failed");
    } finally {
      setIsOrdering(false);
    }
  };

  const processPayment = async () => {
    if (!pendingOrderIdToPay) return;
    try {
      await fetch(`${API_BASE_URLS.PAYMENTS}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: pendingOrderIdToPay }),
      });
      setIsPaymentModalOpen(false);
      setPendingOrderIdToPay(null);
    } catch (e) {
      showNotification("Payment failed");
    }
  };

  const handleManualPay = async (orderId: string) => {
    try {
      await fetch(`${API_BASE_URLS.PAYMENTS}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      showNotification("Processing payment...");
    } catch (e) {
      showNotification("Payment failed");
    }
  };

  const closePaymentModal = () => setIsPaymentModalOpen(false);

  return {
    isOrdering,
    isPaymentModalOpen,
    lastOrderTotal,
    onCheckout,
    processPayment,
    handleManualPay,
    closePaymentModal,
  };
};
