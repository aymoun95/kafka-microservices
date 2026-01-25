import React from "react";
import { Heading, Text } from "../ui/Typography";
import Cart from "./Cart";

interface Product {
  id: string;
  title: string;
  price: number;
}

interface CartSectionProps {
  cartItems: Product[];
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
  isOrdering: boolean;
  hasPendingOrder: boolean;
}

export const CartSection: React.FC<CartSectionProps> = ({
  cartItems,
  onRemoveFromCart,
  onCheckout,
  isOrdering,
  hasPendingOrder,
}) => {
  return (
    <aside className="lg:col-span-5">
      <div className="mb-6 h-[60px] flex flex-col justify-center">
        <Heading variant="h2" className="mb-1">
          Shopping Cart
        </Heading>
        <Text size="sm" color="muted">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </Text>
      </div>
      <Cart
        items={cartItems}
        onRemove={onRemoveFromCart}
        onCheckout={onCheckout}
        isLoading={isOrdering}
        hasPendingOrder={hasPendingOrder}
      />
    </aside>
  );
};

export default CartSection;
