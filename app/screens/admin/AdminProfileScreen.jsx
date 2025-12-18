import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Picker,
  Text,
  View
} from "react-native";
import AdminFooter from "../../components/Adminfooter";


export default function AdminUsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // user_id when updating

  const fetchUsers = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axios.get(
        `EXPO_PUBLIC_BACKEND_UR/api/user`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const changeRole = async (userId, newRole) => {
    setUpdating(userId);
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.put(
        `EXPO_PUBLIC_BACKEND_UR/api/user/${userId}/role`,
        { role: newRole },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      // Update UI
      setUsers((oldUsers) =>
        oldUsers.map((u) =>
          u._id === userId ? { ...u, role: newRole } : u
        )
      );

      Alert.alert("Success", "Role updated successfully.");
    } catch (error) {
      console.error("Error updating role:", error);
      Alert.alert("Error", "Failed to update role.");
    } finally {
      setUpdating(null);
    }
  };

  // Render Each User Card
  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
      }}
    >
      {/* NAME */}
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
        {item.firstName} {item.lastName}
      </Text>

      {/* EMAIL */}
      <Text style={{ color: "#666", marginTop: 4 }}>{item.email}</Text>

      {/* Role Selector */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 4 }}>
          Change Role:
        </Text>

        <Picker
          selectedValue={item.role}
          style={{
            backgroundColor: "#F3F4F6",
            borderRadius: 8,
            height: 40,
            width: "100%",
          }}
          onValueChange={(value) => changeRole(item._id, value)}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Moderator" value="moderator" />
        </Picker>
      </View>

      {/* Updating Indicator */}
      {updating === item._id && (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size="small" color="#4F46E5" />
        </View>
      )}
    </View>
  );

  return (
    <><View style={{ flex: 1, padding: 20, backgroundColor: "#EEF2FF" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 16 }}>
        User Management
      </Text>

      {loading ? (
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Loading users...
          </Text>
        </View>
      ) : users.length === 0 ? (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }} />
      )}
    </View><AdminFooter /></>
  );
}
