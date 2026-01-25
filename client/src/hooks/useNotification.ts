import { useCallback, useState } from "react";

export const useNotification = () => {
  const [msg, setMsg] = useState("");

  const showNotification = useCallback((message: string, duration = 3000) => {
    setMsg(message);
    setTimeout(() => setMsg(""), duration);
  }, []);

  return { msg, showNotification };
};
