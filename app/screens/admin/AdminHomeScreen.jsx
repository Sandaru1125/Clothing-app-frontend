import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AdminFooter from "../../components/Adminfooter";

const AdminHomeScreen = () => {
  return (
    <><View style={styles.container}>

      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Manage your store efficiently 🚀</Text>

      <View style={styles.cardContainer}>

        {/* Manage Products */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/screens/admin/AdminProductsScreen")}
        >
          <AntDesign name="appstore1" size={36} color="#4A90E2" />
          <Text style={styles.cardTitle}>Manage Products</Text>
        </TouchableOpacity>

        {/* Orders */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/screens/admin/AdminProfileScreen")}
        >
          <MaterialIcons name="shopping-bag" size={40} color="#e67e22" />
          <Text style={styles.cardTitle}>Orders</Text>
        </TouchableOpacity>

        {/* Users */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/admin/users")}
        >
          <Entypo name="users" size={38} color="#16a085" />
          <Text style={styles.cardTitle}>Users</Text>
        </TouchableOpacity>

        {/* Reports */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/admin/reports")}
        >
          <MaterialIcons name="insert-chart" size={40} color="#c0392b" />
          <Text style={styles.cardTitle}>Reports</Text>
        </TouchableOpacity>

      </View>

    </View><AdminFooter /></>
    
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
    color: "#555",
  },

  cardContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    backgroundColor: "#f4f6f7",
    paddingVertical: 25,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
  },
});
