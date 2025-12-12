import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import AdminOrderScreen from "../screens/admin/AdminOrderScreen";
import AdminProductScreen from "../screens/admin/AdminProductScreen";
import AdminProfileScreen from "../screens/admin/AdminProfileScreen";

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="AdminOrders" component={AdminOrderScreen} />
      <Stack.Screen name="AdminProducts" component={AdminProductScreen} />
      <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
    </Stack.Navigator>
  );
}
