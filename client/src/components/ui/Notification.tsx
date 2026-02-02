import React from "react";
import { InfoIcon } from "../icons/InfoIcon";

interface NotificationProps {
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (!message) return null;

  const isError =
    message.includes("❌") ||
    message.includes("failed") ||
    message.includes("Protocol");

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right duration-300">
      <div
        className={`bg-white/95 backdrop-blur-xl px-6 py-4 rounded-xl border shadow-xl flex items-center gap-3 min-w-[300px] ${
          isError
            ? "border-rose-200 shadow-rose-500/20"
            : "border-emerald-200 shadow-emerald-500/20"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${isError ? "bg-rose-500" : "bg-emerald-500"}`}
        />
        <span
          className={`font-medium text-sm ${isError ? "text-rose-700" : "text-emerald-700"}`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export const InfoBox: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
    <InfoIcon className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">
        {title}
      </p>
      <div className="text-sm text-blue-700 leading-relaxed">{children}</div>
    </div>
  </div>
);
