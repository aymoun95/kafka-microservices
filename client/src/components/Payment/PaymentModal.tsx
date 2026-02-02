import React from "react";
import { PaymentIcon } from "../icons/PaymentIcon";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Heading, Text } from "../ui/Typography";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  total: number;
  orderCount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  total,
  orderCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <Card className="max-w-md w-full relative z-10 shadow-lg bg-white">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <PaymentIcon className="h-8 w-8 text-black" />
            </div>
            <Heading variant="h2" className="mb-2">
              Confirm Payment
            </Heading>
            <Text size="sm" color="muted">
              Review your order details below
            </Text>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <Text size="sm" color="muted">
                Items
              </Text>
              <Text size="base" className="font-semibold text-black">
                {orderCount}
              </Text>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Text size="sm" className="font-semibold text-black">
                Total Amount
              </Text>
              <Heading variant="h2" className="!text-3xl !text-black">
                ${total}
              </Heading>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={onClose} size="lg">
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm} size="lg">
              Pay ${total}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentModal;
