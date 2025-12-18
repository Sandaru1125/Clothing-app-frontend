import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AdminFooter from "../../components/Adminfooter";

export default function AdminProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await axios.get(
        "EXPO_PUBLIC_BACKEND_UR/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoaded(true);
    }
  }

  function filteredProducts() {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async function deleteProduct(id) {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(
                "EXPO_PUBLIC_BACKEND_UR/api/product/" + id
              );
              loadProducts();
              Alert.alert("Success", "Product deleted successfully");
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Something went wrong");
            }
          },
        },
      ]
    );
  }

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productId}>#{item.productId}</Text>
      </View>

      <Text style={styles.price}>Price: ${item.price}</Text>
      <Text style={styles.price}>Label Price: ${item.labeledprice}</Text>

      <Text
        style={[
          styles.stock,
          item.stock > 10
            ? { color: "green" }
            : item.stock > 0
            ? { color: "orange" }
            : { color: "red" },
        ]}
      >
        {item.stock} in stock
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => deleteProduct(item.productId)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/screens/admin/AdminEditProductScreen",
              params: { product: JSON.stringify(item) },
            });
          }}
        >
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <><View style={styles.container}>
           <View>
            <View>
          <Text style={styles.heading}>Product Management</Text>
          </View>
         <View>
          <TouchableOpacity
            style={styles.addproduct}
            onPress={() => {
              router.push("/screens/admin/AddProduct");
            }}
          >
            <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>
              + Add New Product
            </Text>
          </TouchableOpacity>
          </View>
          </View>
          <TextInput
              style={styles.searchBox}
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChangeText={setSearchTerm} />

          {!loaded ? (
              <ActivityIndicator size="large" color="blue" />
          ) : filteredProducts().length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No products found.
              </Text>
          ) : (
              <FlatList
                  data={filteredProducts()}
                  keyExtractor={(item) => item.productId}
                  renderItem={renderProduct} />
          )}
      </View><AdminFooter /></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f4f7",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
  },
  productId: {
    fontSize: 14,
    color: "#777",
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  stock: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
    gap: 20,
  },


addproduct: {
  backgroundColor: "#EAF3FF",
  borderWidth: 1,
  borderColor: "#4A90E2",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 15,

  // Shadow for Android
  elevation: 4,

  // Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
},


});
