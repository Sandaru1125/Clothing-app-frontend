import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Mediauplod from "../../utils/mediauplod";

export default function AddProduct({ navigation }) {

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [price, setPrice] = useState("");
  const [labeledprice, setLabeledprice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");


  // 📸 Pick multiple images
  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((a) => a.uri);
      setImages([...images, ...selectedImages]);
    }
  }


  async function handleSubmit() {
    setLoading(true);

    try {
      // 👇 Split comma-separated alt names
      const altNamesArray = altName.split(",");

      // 👇 Upload images (you will replace this with your Mediauplod logic)
      let uploadedImages = [];
      for (let img of images) {
        const uploadedUrl = await Mediauplod(img); // your upload function
        uploadedImages.push(uploadedUrl);
      }

      // 👇 Check if any images were uploaded
      if (uploadedImages.length === 0) {
        alert("Please select at least one image.");
        setLoading(false);
        return;
      }

      const token = await AsyncStorage.getItem("token");

      const productData = {
        name,
        description,
        price: Number(price), // Ensure price is a number
        category,
        imageUrl: uploadedImages[0], // Use the first image
        stock: Number(stock), // Ensure stock is a number
      };

      await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/product`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product Added!");
      navigation.goBack();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }


  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Add New Product</Text>

      {/* Product ID */}
      <Text style={styles.label}>Product ID *</Text>
      <TextInput
        style={styles.input}
        value={productId}
        onChangeText={setProductId}
        placeholder="Enter unique product ID"
      />

      {/* Product Name */}
      <Text style={styles.label}>Product Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      {/* Alt Names */}
      <Text style={styles.label}>Alternative Names</Text>
      <TextInput
        style={styles.input}
        value={altName}
        onChangeText={setAltName}
        placeholder="Comma separated values"
      />

      {/* Price */}
      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="0.00"
      />

      {/* Original Price */}
      <Text style={styles.label}>Original Price *</Text>
      <TextInput
        style={styles.input}
        value={labeledprice}
        onChangeText={setLabeledprice}
        keyboardType="numeric"
        placeholder="0.00"
      />
     

        {/* Original Price */}
      <Text style={styles.label}>clothing type</Text>
      <Picker
      style={styles.input}
      selectedValue={category}
      onValueChange={(itemValue) => setCategory(itemValue)}
    >
      <Picker.Item label="Select Category" value="" />
      <Picker.Item label="Men" value="men" />
      <Picker.Item label="Women" value="women" />
      <Picker.Item label="Kids" value="kids" />
    </Picker>


      {/* Stock */}
      <Text style={styles.label}>Stock Quantity *</Text>
      <TextInput
        style={styles.input}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        placeholder="Enter quantity"
      />

      {/* Images */}
      <Text style={styles.label}>Product Images *</Text>
      <TouchableOpacity style={styles.imageBtn} onPress={pickImages}>
        <Text style={styles.imageBtnText}>Pick Images</Text>
      </TouchableOpacity>

      <ScrollView horizontal>
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }}
          />
        ))}
      </ScrollView>

      {/* Description */}
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Enter detailed product description"
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Add Product</Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f0f4ff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 20
  },
  label: { marginTop: 15, fontWeight: "600", color: "#333" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#bbb"
  },
  imageBtn: {
    backgroundColor: "#4f46e5",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    alignItems: "center"
  },
  imageBtnText: { color: "#fff", fontWeight: "600" },
  submitBtn: {
    backgroundColor: "#1e40af",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30
  },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "700" }
});

