import React from "react";
import { Heading, Text } from "../ui/Typography";
import OrderCard from "./OrderCard";

interface Order {
  id: string;
  productIds: string[];
  status: string;
}

interface OrderHistorySectionProps {
  orders: Order[];
  onManualPay: (orderId: string) => void;
}

export const OrderHistorySection: React.FC<OrderHistorySectionProps> = ({
  orders,
  onManualPay,
}) => {
  return (
    <section className="mt-20 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading variant="h2" className="mb-2">
            Order History
          </Heading>
          <Text size="sm" color="muted">
            Real-time updates via Kafka
          </Text>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Text
            size="xs"
            className="font-semibold text-emerald-700 uppercase tracking-wider"
          >
            Live
          </Text>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <Text color="muted" className="font-medium">
                No orders yet
              </Text>
            </div>
          </div>
        ) : (
          orders
            .slice()
            .reverse()
            .map((order) => (
              <OrderCard key={order.id} order={order} onPay={onManualPay} />
            ))
        )}
      </div>
    </section>
  );
};

export default OrderHistorySection;
