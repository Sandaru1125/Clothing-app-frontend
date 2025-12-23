import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { CartContext } from "../../context/CartContext";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL; // change if needed

export default function KidsScreen() {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKidsProducts();
  }, []);

  const fetchKidsProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products?category=kids`
      );
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching kids products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
    });
    Toast.show({
      type: "success",
      text1: "Added to Cart",
      text2: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kids Collection</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>Rs. {item.price}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.btnText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  router.push({
                    pathname: "/screens/cart/Buynow",
                    params: { product: JSON.stringify(item) },
                  })
                }
              >
                <Text style={styles.btnText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No kids products available
          </Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
