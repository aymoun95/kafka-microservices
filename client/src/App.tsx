import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { useCheckout } from "./hooks/useCheckout";
import { useNotification } from "./hooks/useNotification";
import { useOrderWorkflow } from "./hooks/useOrderWorkflow";
import { useProducts } from "./hooks/useProducts";

import AuthForm from "./components/Auth/AuthForm";
import CartSection from "./components/Cart/CartSection";
import Navbar from "./components/Navbar/Navbar";
import OrderHistorySection from "./components/Orders/OrderHistorySection";
import PaymentModal from "./components/Payment/PaymentModal";
import Storefront from "./components/Storefront/Storefront";

import { PageShell } from "./components/ui/Layout";
import { Notification } from "./components/ui/Notification";

function App() {
  const { currentUser, logout, signup } = useAuth();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const { products, refreshProducts } = useProducts();
  const { msg, showNotification } = useNotification();

  const { orders, fetchOrders } = useOrderWorkflow(
    currentUser,
    clearCart,
    showNotification,
    refreshProducts,
  );

  const {
    isOrdering,
    isPaymentModalOpen,
    lastOrderTotal,
    onCheckout,
    processPayment,
    handleManualPay,
    closePaymentModal,
  } = useCheckout(currentUser, cartItems, fetchOrders, showNotification);

  const handleSignup = async (email: string) => {
    const result = await signup(email);
    if (!result.success) {
      showNotification(result.error || "Signup failed");
    }
  };

  if (!currentUser) {
    return <AuthForm onSignup={handleSignup} message={msg} />;
  }

  const hasPendingOrder = orders.some((o) => o.status === "created");

  return (
    <PageShell>
      <Navbar userEmail={currentUser.email} onLogout={logout} />
      <Notification message={msg} />

      <main className="max-w-7xl mx-auto px-8 pb-32">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <Storefront
            products={products}
            onAddToCart={addToCart}
            hasPendingOrder={hasPendingOrder}
          />

          <CartSection
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onCheckout={onCheckout}
            isOrdering={isOrdering}
            hasPendingOrder={hasPendingOrder}
          />
        </div>

        <OrderHistorySection orders={orders} onManualPay={handleManualPay} />
      </main>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        onConfirm={processPayment}
        total={lastOrderTotal}
        orderCount={cartItems.length}
      />
    </PageShell>
  );
}

export default App;
