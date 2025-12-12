import { router } from "expo-router";
import { createContext, useState } from "react";
import * as api from "../../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    const response = await api.login({ email, password });
    if (response.ok) {
      const userData = response.body.user;
      setUser(userData);
      if (userData.role === "admin") {
        setIsAdmin(true);
        router.replace("/screens/admin/AdminHomeScreen");
      } else {
        setIsAdmin(false);
        router.replace("/home");
      }
    } else {
      alert(response.body?.message || response.error || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
