import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AdminFooter = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("users");

  useEffect(() => {
    if (pathname.includes("AdminProfileScreen")) setActive("users");
    if (pathname.includes("AdminProductScreen")) setActive("products");
    if (pathname.includes("AdminOrderScreen")) setActive("orders");
  }, [pathname]);

  const handleLogout = () => {
    // 🔴 If you use AsyncStorage / token, clear it here
    // await AsyncStorage.removeItem("token");

    router.replace("/home"); // navigate to home.jsx
  };

  return (
    <View style={styles.container}>
      {/* Users */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setActive("users");
          router.push("/screens/admin/AdminProfileScreen");
        }}
      >
        <Ionicons
          name="people-outline"
          size={26}
          color={active === "users" ? "#007bff" : "#555"}
        />
        <Text style={[styles.label, active === "users" && styles.activeLabel]}>
          Users
        </Text>
      </TouchableOpacity>

      {/* Products */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setActive("products");
          router.push("/screens/admin/AdminProductScreen");
        }}
      >
        <Fontisto
          name="product-hunt"
          size={26}
          color={active === "products" ? "#007bff" : "#555"}
        />
        <Text style={[styles.label, active === "products" && styles.activeLabel]}>
          Products
        </Text>
      </TouchableOpacity>

      {/* Orders */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setActive("orders");
          router.push("/screens/admin/AdminOrderScreen");
        }}
      >
        <MaterialCommunityIcons
          name="order-bool-ascending-variant"
          size={26}
          color={active === "orders" ? "#007bff" : "#555"}
        />
        <Text style={[styles.label, active === "orders" && styles.activeLabel]}>
          Orders
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={26} color="#dc3545" />
        <Text style={[styles.label, { color: "#dc3545" }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  btn: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  activeLabel: {
    color: "#007bff",
  },
});

export default AdminFooter;
