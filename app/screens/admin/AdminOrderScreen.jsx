import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AdminFooter from "../../components/Adminfooter";

export default function AdminOrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        "EXPO_PUBLIC_BACKEND_UR/api/order",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setOrders(res.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load orders");
    } finally {
      setLoaded(true);
    }
  }

  async function changeStatus(orderID, status) {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        "EXPO_PUBLIC_BACKEND_URL/api/order/" + orderID,
        { status },
        { headers: { Authorization: "Bearer " + token } }
      );
      Alert.alert("Success", "Order status updated");
      fetchOrders();
    } catch (err) {
      Alert.alert("Error", "Update failed");
    }
  }

  async function deleteOrder(id) {
    Alert.alert(
      "Confirm Delete",
      "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              await axios.delete(
                "EXPO_PUBLIC_BACKEND_UR/api/order/" + id,
                {
                  headers: { Authorization: "Bearer " + token },
                }
              );
              Alert.alert("Success", "Order deleted");
              fetchOrders();
            } catch (err) {
              Alert.alert("Error", "Delete failed");
            }
          },
        },
      ]
    );
  }

  function filterSortOrders() {
    return orders
      .filter((o) => filterStatus === "all" || o.status === filterStatus)
      .sort((a, b) => {
        if (sortBy === "date") {
          return sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        } else if (sortBy === "total") {
          return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
        }
        return 0;
      });
  }

  const statusColor = (status) => {
    return (
      {
        pending: "#eab308",
        shipped: "#3b82f6",
        delivered: "#16a34a",
        cancelled: "#dc2626",
      }[status] || "#374151"
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>#{item.orderID}</Text>
        <Text style={{ color: statusColor(item.status), fontWeight: "bold" }}>
          {item.status.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.customer}>{item.name} ({item.email})</Text>
      <Text style={styles.customer}>Phone: {item.phoneNumber}</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            setActiveOrder(item);
            setModalVisible(true);
          }}
        >
          <Ionicons name="eye-outline" size={22} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => deleteOrder(item._id)}
        >
          <MaterialIcons name="delete" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <><View style={styles.container}>
          <Text style={styles.pageTitle}>Order Management</Text>

          {/* Filters */}
          <View style={styles.filterRow}>
              <TouchableOpacity
                  style={styles.filterBtn}
                  onPress={() => setFilterStatus((prev) => prev === "all" ? "pending" : prev === "pending" ? "shipped" : prev === "shipped" ? "delivered" : "all"
                  )}
              >
                  <Text>Filter: {filterStatus}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.filterBtn}
                  onPress={() => setSortBy(sortBy === "date" ? "total" : "date")}
              >
                  <Text>Sort by: {sortBy}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.filterBtn}
                  onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                  <Text>Order: {sortOrder}</Text>
              </TouchableOpacity>
          </View>

          {!loaded ? (
              <ActivityIndicator size="large" />
          ) : (
              <FlatList
                  data={filterSortOrders()}
                  keyExtractor={(item) => item.orderID}
                  renderItem={renderOrder} />
          )}

          {/* Modal */}
          <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalWrap}>
                  <View style={styles.modalBox}>
                      {activeOrder && (
                          <>
                              <View style={styles.modalHeader}>
                                  <Text style={styles.modalTitle}>Order #{activeOrder.orderID}</Text>

                                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                                      <AntDesign name="closecircle" size={26} color="white" />
                                  </TouchableOpacity>
                              </View>

                              <ScrollView style={{ padding: 15 }}>
                                  <Text style={styles.sectionTitle}>Customer Info</Text>
                                  <Text>{activeOrder.name}</Text>
                                  <Text>{activeOrder.email}</Text>
                                  <Text>{activeOrder.phoneNumber}</Text>

                                  <Text style={styles.sectionTitle}>Address</Text>
                                  <Text>{activeOrder.address}</Text>

                                  <Text style={styles.sectionTitle}>Order Items</Text>

                                  {activeOrder.billItems.map((item, i) => (
                                      <View key={i} style={styles.itemCard}>
                                          <Text style={styles.itemName}>{item.name}</Text>
                                          <Text>Qty: {item.quantity}</Text>
                                          <Text>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
                                      </View>
                                  ))}
                              </ScrollView>
                          </>
                      )}
                  </View>
              </View>
          </Modal>
      </View><AdminFooter /></>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#eef2ff" },
  pageTitle: { fontSize: 26, fontWeight: "bold", marginBottom: 15 },
  filterRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  filterBtn: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  orderId: { fontSize: 16, fontWeight: "bold" },
  customer: { color: "#555", marginTop: 4 },
  total: { fontWeight: "bold", marginTop: 10 },
  date: { color: "#777", marginTop: 10 },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  iconButton: { marginHorizontal: 8 },
  modalWrap: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 15,
  },
  modalBox: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    maxHeight: "90%",
  },
  modalHeader: {
    backgroundColor: "#4f46e5",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  sectionTitle: { marginTop: 15, fontSize: 16, fontWeight: "bold" },
  itemCard: {
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    marginTop: 10,
  },
  itemName: { fontWeight: "bold", marginBottom: 5 },
});
