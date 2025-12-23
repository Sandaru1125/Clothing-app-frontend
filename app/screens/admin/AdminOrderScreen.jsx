import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import AdminFooter from "../../components/Adminfooter";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function AdminOrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/orders`, {
        headers: { Authorization: "Bearer " + token },
      });
      setOrders(res.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.customer}>Product ID: {item.product}</Text>
      <Text style={styles.customer}>Name: {item.name}</Text>
      <Text style={styles.customer}>Phone: {item.phone}</Text>
      <Text style={styles.customer}>Address: {item.address}</Text>
      <Text style={styles.customer}>City: {item.city}</Text>
      <Text style={styles.date}>
        Ordered on: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Orders</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrder}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No orders found.</Text>
          }
        />
      </View>
      <AdminFooter />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#eef2ff",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  customer: {
    color: "#555",
    marginTop: 4,
    fontSize: 16,
  },
  date: {
    color: "#777",
    marginTop: 10,
    textAlign: "right",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#777",
  },
});
