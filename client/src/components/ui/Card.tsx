import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered" | "dashed";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    glass: "bg-white backdrop-blur-xl border border-gray-200 shadow-sm",
    bordered: "bg-white border border-gray-300",
    dashed: "border-2 border-dashed border-gray-300 bg-white",
  };

  return (
    <div
      className={`${variants[variant]} rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
