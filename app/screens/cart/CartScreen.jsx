import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../../context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } = useContext(CartContext);

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>My Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={60} color="gray" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>Rs {item.price}</Text>

                  <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
                      <Ionicons name="remove" size={18} />
                    </TouchableOpacity>

                    <Text style={styles.qty}>{item.qty}</Text>

                    <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
                      <Ionicons name="add" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.bottomBar}>
            <Text style={styles.totalText}>Total: Rs {totalPrice}</Text>

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },

  infoContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  price: {
    fontSize: 15,
    color: "#333",
    marginVertical: 3,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    backgroundColor: "#ddd",
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 4,
  },

  qty: {
    fontSize: 16,
    marginHorizontal: 6,
  },

  bottomBar: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  checkoutBtn: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: "gray",
  },
});
