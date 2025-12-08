import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Footer from "./footer";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <><View style={styles.container}>
        <View style={ styles.main }>
          <Text style={styles.title}>Welcome Back </Text>
          <Text style={styles.subtitle}>Login to your account</Text>
</View>
          {/* Email */}
          <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address" />

          {/* Password */}
          <View style={styles.passwordContainer}>
              <TextInput
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  style={styles.passwordInput} />

              <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
              >
                  <Ionicons
                      name={passwordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="#666" />
              </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* Bottom Text */}<TouchableOpacity

              onPress={() => router.push("/drawer/signup")}
          >
              <Text style={styles.bottomText}>
                  Don’t have an account? <Text style={styles.signupText}>Sign Up</Text>
              </Text>
          </TouchableOpacity>
      </View><Footer /></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f7f9fc",
    marginTop: -50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomText: {
    marginTop: 20,
    color: "#333",
  },
  signupText: {
    color: "#4a90e2",
    fontWeight: "bold",
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
});
