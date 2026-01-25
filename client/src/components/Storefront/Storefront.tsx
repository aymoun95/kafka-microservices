import React from "react";
import { Heading } from "../ui/Typography";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
}

interface StorefrontProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  hasPendingOrder: boolean;
}

export const Storefront: React.FC<StorefrontProps> = ({
  products,
  onAddToCart,
  hasPendingOrder,
}) => {
  return (
    <section className="lg:col-span-7">
      <div className="mb-6 h-[60px] flex flex-col justify-center">
        <Heading variant="h2" className="mb-1">
          Featured Products
        </Heading>
        <div className="h-1 w-12 bg-black rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuy={() => onAddToCart(product)}
            isLoading={false}
            hasPendingOrder={hasPendingOrder}
          />
        ))}
      </div>
    </section>
  );
};

export default Storefront;
