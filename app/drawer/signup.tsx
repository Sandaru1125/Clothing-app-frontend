import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { signup } from "../../services/api.js";
import Footer from "./footer";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ") || "Unknown";

    const result = await signup({
      email,
      password,
      firstName,
      lastName,
      role: "user",
    });

    // Log full response for debugging (stringified so console shows full contents)
    console.log("signup result:", JSON.stringify(result, null, 2));

    if (!result?.ok) {
      console.error("signup error details:", result);
    }

    if (result?.ok) {
      const message = result.body?.message || "Account created successfully!";
      Alert.alert("Success", message);
      router.push("/drawer/login");
      return;
    }

    // Show detailed error when available
    const errorMessage = result?.body?.message || result?.error || `Request failed (status ${result?.status})`;
    Alert.alert("Error", errorMessage);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Dressify today 👗✨</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          placeholderTextColor="#777"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          placeholder="Email Address"
          style={styles.input}
          placeholderTextColor="#777"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          placeholderTextColor="#777"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.signupBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/drawer/login")}>
          <Text style={styles.loginLink}>
            Already have an account?{" "}
            <Text style={styles.loginText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "center",
    marginTop: -40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  signupBtn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
  },
  signupBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginLink: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  loginText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
});
