import React from "react";

export const CartEmptyIcon: React.FC<React.ComponentProps<"svg">> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={className || "w-8 h-8 text-gray-400"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
};
