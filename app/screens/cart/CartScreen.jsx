import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useRef } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Footer from "../../components/Homefooter";
import { CartContext } from "../../context/CartContext";

const BASE_URL = "http://192.168.8.103:4500";

export default function CartScreen() {
  const { productId, action } = useLocalSearchParams();
  const addedRef = useRef(false);

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useContext(CartContext);

  useEffect(() => {
    if (productId && action === "add" && !addedRef.current) {
      addedRef.current = true;
      addProductToCart(productId);
    }
  }, [productId]);

  const addProductToCart = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${id}`);
      const product = res.data;

      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      });
    } catch (err) {
      console.log("Add to cart error", err);
    }
  };

  return (
    <><View style={styles.container}>
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>Rs {item.price}</Text>

                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      onPress={() => decreaseQty(item.id)}
                      style={styles.qtyBtn}
                    >
                      <Ionicons name="remove" size={18} />
                    </TouchableOpacity>

                    <Text style={styles.qty}>{item.qty}</Text>

                    <TouchableOpacity
                      onPress={() => increaseQty(item.id)}
                      style={styles.qtyBtn}
                    >
                      <Ionicons name="add" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>
              </View>
            )} />

          <View style={styles.bottomBar}>
            <Text style={styles.totalText}>Total: Rs {totalPrice}</Text>

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View><Footer /></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    padding: 4,
  },
  qty: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
    marginTop: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  checkoutBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
