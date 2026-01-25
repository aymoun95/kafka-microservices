import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === productId);
      if (idx > -1) {
        const newItems = [...prev];
        newItems.splice(idx, 1);
        return newItems;
      }
      return prev;
    });
  };

  const clearCart = () => setCartItems([]);

  return { cartItems, addToCart, removeFromCart, clearCart };
};
