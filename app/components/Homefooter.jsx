import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      
      {/* Home */}
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.iconBox}>
        <Entypo name="home" size={26} color="#333" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity onPress={() => router.push("/screens/auth/LoginScreen")} style={styles.iconBox}>
        <AntDesign name="login" size={26} color="#333" />
        <Text style={styles.label}>Login</Text>
      </TouchableOpacity>

      {/* Signup */}
      <TouchableOpacity onPress={() => router.push("/screens/auth/SignupScreen")} style={styles.iconBox}>
        <AntDesign name="adduser" size={26} color="#333" />
        <Text style={styles.label}>Sign Up</Text>
      </TouchableOpacity>

      {/* Cart */}
      <TouchableOpacity onPress={() => router.push("/screens/cart/CartScreen")} style={styles.iconBox}>
        <FontAwesome name="shopping-cart" size={26} color="#333" />
        <Text style={styles.label}>Cart</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  iconBox: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 3,
    color: "#333",
    fontWeight: "500",
  },
});
