import { useCallback, useState } from "react";
import { API_BASE_URLS } from "../constants";

interface User {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  const signup = useCallback(async (email: string) => {
    try {
      const res = await fetch(`${API_BASE_URLS.AUTH}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "password" }),
      });
      const data = await res.json();
      const user = { id: data.id, email: data.email };
      login(user);
      return { success: true };
    } catch (e) {
      console.error("Signup failed", e);
      return { success: false, error: "Signup failed" };
    }
  }, []);

  return { currentUser, login, logout, signup };
};
