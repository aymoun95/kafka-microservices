import React from "react";

export const RemoveItemIcon: React.FC<React.ComponentProps<"svg">> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={className || "w-5 h-5"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
