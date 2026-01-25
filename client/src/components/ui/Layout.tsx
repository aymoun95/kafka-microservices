import React from "react";

export const PageShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="min-h-screen bg-[#F5F5F5] text-black selection:bg-gray-200 font-sans">
    {children}
  </div>
);

export const MainGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <main className="max-w-7xl mx-auto px-6 pb-20">
    <div className="grid lg:grid-cols-12 gap-10">{children}</div>
  </main>
);

export const Column: React.FC<{
  span?: number;
  children: React.ReactNode;
  className?: string;
}> = ({ span = 6, children, className = "" }) => {
  const spans: Record<number, string> = {
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
  };

  return (
    <div className={`${spans[span]} space-y-12 ${className}`}>{children}</div>
  );
};
