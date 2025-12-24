import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Footer from "../../components/Homefooter";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const Buynow = () => {
  const router = useRouter();
  const { product: productString } = useLocalSearchParams();
  const product = JSON.parse(productString);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleBuyNow = async () => {
    if (!name || !phone || !address || !city) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill all fields",
      });
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/orders`, {
        product: product._id,
        name,
        phone,
        address,
        city,
      });

      Toast.show({
        type: "success",
        text1: "Order Placed",
        text2: "Your order has been placed successfully!",
      });

      router.push("/home"); // Redirect to home after order
    } catch (error) {
      console.log("Error placing order", error);
      Toast.show({
        type: "error",
        text1: "Order Failed",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Buy Now</Text>

        <View style={styles.productInfo}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.price}>Rs. {product.price}</Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={[styles.input, styles.address]}
          placeholder="Delivery Address"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
          <Text style={styles.buttonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </>
  );
};

export default Buynow;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  productInfo: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 15,
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  address: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
