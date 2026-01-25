import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Text } from "../ui/Typography";

interface Order {
  id: string;
  productIds: string[];
  status: string;
}

interface OrderCardProps {
  order: Order;
  onPay: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPay }) => {
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "created":
        return "blue";
      case "completed":
        return "emerald";
      case "cancelled":
        return "rose";
      default:
        return "slate";
    }
  };

  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Text
            size="xs"
            color="muted"
            className="uppercase tracking-wider mb-1 font-medium"
          >
            Order ID
          </Text>
          <code className="text-sm font-mono text-black bg-gray-100 px-2 py-1 rounded">
            {order.id.slice(0, 8)}...
          </code>
        </div>
        <Badge
          variant={getBadgeVariant(order.status)}
          pulse={order.status === "created"}
        >
          {order.status}
        </Badge>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex flex-col gap-2 items-baseline">
          <div className="flex items-baseline justify-center gap-1">
            <Text size="xs" className="font-medium text-black mt-0.5">
              {order.productIds.length}
            </Text>
            <Text
              size="xs"
              color="muted"
              className="uppercase tracking-wider font-medium"
            >
              Items
            </Text>
          </div>
          {order.status === "created" && (
            <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded text-[10px] font-medium text-amber-700 border border-amber-100">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Expires in 15s
            </div>
          )}
        </div>
        {order.status === "created" && (
          <Button size="sm" variant="success" onClick={() => onPay(order.id)}>
            Pay Now
          </Button>
        )}
      </div>
    </Card>
  );
};

export default OrderCard;
