import React from "react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Heading, Text } from "../ui/Typography";

interface Product {
  id: string;
  title: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onBuy: (productId: string) => void;
  isLoading: boolean;
  hasPendingOrder: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onBuy,
  isLoading,
  hasPendingOrder,
}) => {
  return (
    <Card className="group hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
            {product.title.charAt(0)}
          </div>
        </div>
      </div>

      <CardContent className="p-4 bg-white">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Heading variant="h3" className="!text-sm !font-semibold mb-0.5">
              {product.title}
            </Heading>
            <Text size="xs" color="muted">
              Premium Collection
            </Text>
          </div>
          <div className="text-right ml-3">
            <span className="text-lg font-bold text-black">
              ${product.price}
            </span>
          </div>
        </div>

        <Button
          onClick={() => onBuy(product.id)}
          disabled={hasPendingOrder}
          isLoading={isLoading}
          variant="primary"
          size="sm"
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
