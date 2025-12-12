import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="screens/auth/LoginScreen" options={{ title: "Login" }} />
          <Stack.Screen name="screens/auth/SignupScreen" options={{ title: "Sign Up" }} />
          <Stack.Screen name="screens/cart/CartScreen" options={{ title: "Cart" }} />
          <Stack.Screen name="screens/admin/AdminHomeScreen" options={{ title: "Admin" }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
