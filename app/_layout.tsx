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
          <Stack.Screen name="screens/cart/Buynow" />
        </Stack>
        <Toast />
      </CartProvider>
    </AuthProvider>
  );
}
