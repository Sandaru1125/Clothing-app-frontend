import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const menData = [
  { id: "1", name: "Men Shirt", price: "$22", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Men Trouser", price: "$28", image: "https://via.placeholder.com/150" },
];

export default function MenScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Men Collection</Text>

      <FlatList
        data={menData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  image: { width: "100%", height: 150, borderRadius: 10 },
  productName: { fontSize: 18, fontWeight: "600", marginTop: 8 },
  price: { fontSize: 16, color: "green", marginVertical: 5 },
  btn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
