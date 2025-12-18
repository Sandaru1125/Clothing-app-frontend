import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="home" />
      <Drawer.Screen name="men" />
      <Drawer.Screen name="women" />
      <Drawer.Screen name="kids" />
      <Drawer.Screen name="cart" />
      <Drawer.Screen name="login" />
      <Drawer.Screen name="signup" />
      <Drawer.Screen name="footer" options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}
