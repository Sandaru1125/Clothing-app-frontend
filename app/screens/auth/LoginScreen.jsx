import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }
    login(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" />
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />

        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={!showPass}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Ionicons
            name={showPass ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Signup redirect */}
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupText}>
          Don&apos;t have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },

  textInput: {
    flex: 1,
    height: 45,
    marginLeft: 10,
  },

  loginBtn: {
    backgroundColor: "black",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  signupText: {
    fontSize: 15,
    color: "#444",
  },

  signupLink: {
    fontWeight: "bold",
    color: "black",
  },
});
