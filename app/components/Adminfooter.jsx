import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AdminFooter = () => {
  const pathname = usePathname(); // Detect active route
  const [active, setActive] = useState("users");

  useEffect(() => {
    if (pathname.includes("AdminProfileScreen")) setActive("users");
    if (pathname.includes("AdminProductScreen")) setActive("products");
    if (pathname.includes("AdminOrderScreen")) setActive("orders");
  }, [pathname]);

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
        <Text
          style={[styles.label, active === "products" && styles.activeLabel]}
        >
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
    </View>
  );
};

export default AdminFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  btn: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
  activeLabel: {
    color: "#007bff",
    fontWeight: "600",
  },
});
