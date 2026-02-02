import React from "react";
import { CartEmptyIcon } from "../icons/CartEmptyIcon";
import { RemoveItemIcon } from "../icons/RemoveItemIcon";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { InfoBox } from "../ui/Notification";
import { Heading, Text } from "../ui/Typography";

interface CartItem {
  id: string;
  title: string;
  price: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  isLoading: boolean;
  hasPendingOrder: boolean;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onRemove,
  onCheckout,
  isLoading,
  hasPendingOrder,
}) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Card className="shadow-sm h-[calc(100vh-180px)] flex flex-col sticky top-4 bg-white border border-gray-200">
      <CardContent className="flex flex-col h-full p-6 relative">
        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 min-h-0">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 opacity-40">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <CartEmptyIcon className="w-8 h-8 text-gray-400" />
              </div>
              <Text color="muted" className="font-medium">
                Your cart is empty
              </Text>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 group hover:border-gray-300 transition-all shrink-0"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <Text
                    size="base"
                    className="font-semibold text-black mb-0.5 truncate"
                  >
                    {item.title}
                  </Text>
                  <Text size="sm" className="text-gray-600">
                    ${item.price}
                  </Text>
                </div>
                {!hasPendingOrder && (
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 shrink-0"
                  >
                    <RemoveItemIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 pt-6 mt-4 shrink-0 bg-white">
            <div className="flex justify-between items-end mb-6">
              <Text
                size="sm"
                color="muted"
                className="uppercase tracking-wider mb-1 font-medium"
              >
                Total
              </Text>
              <Heading variant="h1" className="!text-3xl !text-black">
                ${total}
              </Heading>
            </div>

            {hasPendingOrder && (
              <div className="mb-4">
                <InfoBox title="Order Processing">
                  Please wait while we secure your inventory.
                </InfoBox>
              </div>
            )}

            <Button
              onClick={onCheckout}
              disabled={hasPendingOrder}
              isLoading={isLoading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {hasPendingOrder ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;
