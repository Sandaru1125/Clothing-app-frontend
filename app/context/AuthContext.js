import AsyncStorage from "@react-native-async-storage/async-storage";
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
      const { user: userData, token } = response.body;
      setUser(userData);
      await AsyncStorage.setItem("token", token); // Store the token

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

  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
