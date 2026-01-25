import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<
  TypographyProps & { variant?: "h1" | "h2" | "h3" }
> = ({ children, variant = "h2", className = "" }) => {
  const styles = {
    h1: "text-4xl font-bold tracking-tight text-slate-900",
    h2: "text-2xl font-bold tracking-tight text-slate-800",
    h3: "text-lg font-semibold text-slate-800",
  };

  const Component = variant;

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export const Text: React.FC<
  TypographyProps & {
    size?: "sm" | "xs" | "base";
    color?: "default" | "muted" | "primary" | "error";
  }
> = ({ children, size = "base", color = "default", className = "" }) => {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  };

  const colors = {
    default: "text-slate-700",
    muted: "text-slate-500",
    primary: "text-primary-600",
    error: "text-rose-600",
  };

  return (
    <p className={`${sizes[size]} ${colors[color]} ${className}`}>{children}</p>
  );
};
