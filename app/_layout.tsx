import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="drawer" />
        </Stack>
        <Toast />
      </CartProvider>
    </AuthProvider>
  );
}
