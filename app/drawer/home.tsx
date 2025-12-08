import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Footer from './footer';

export default function Home() {
  return (
    <><ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.headerContainer}>

        <View style={styles.header}>
          <Text style={styles.appName}>Dressify</Text>
          <Text style={styles.welcome}>Find Your Perfect Style 👗✨</Text>
        </View>
     
      </View>
      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require("../../assets/images/img3.jpg")}
          style={styles.bannerImage} />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryCard}>
          <Text style={styles.categoryText}>Women</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryCard}>
          <Text style={styles.categoryText}>Men</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryCard}>
          <Text style={styles.categoryText}>Kids</Text>
        </TouchableOpacity>
      </View>

      {/* New Arrivals */}
      <Text style={styles.sectionTitle}>New Arrivals</Text>
      <View style={styles.productRow}>

        <View style={styles.productCard}>
          <Image
            source={require("../../assets/images/img0.jpg")}
            style={styles.productImage} />
          <Text style={styles.productName}>Summer Floral Dress</Text>
          <Text style={styles.price}>$45.00</Text>
        </View>

        <View style={styles.productCard}>
          <Image
            source={require("../../assets/images/img1.jpg")}
            style={styles.productImage} />
          <Text style={styles.productName}>{"Casual Men's T-Shirt"}</Text>
          <Text style={styles.price}>$25.00</Text>
        </View>

      </View>

      {/* Offers Section */}
      <Text style={styles.sectionTitle}>Special Offers</Text>
      <View style={styles.offerCard}>
        <Text style={styles.offerTitle}>🔥 Mega Sale 40% OFF</Text>
        <Text style={styles.offerSubtitle}>On all winter collections</Text>

        <TouchableOpacity style={styles.offerButton}>
          <Text style={styles.offerButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

    </ScrollView><Footer /></>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fefefe",
  },
  header: {
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 16,
    color: "#555",
  },

  // Banner
  banner: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },

  // Categories
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  categoryCard: {
    backgroundColor: "#fff",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    elevation: 4,
  },
  categoryText: {
    textAlign: "center",
    fontWeight: "600",
  },

  // Products
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    justifyContent: "center",
  alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 4,
  },

  // Offer card
  offerCard: {
    backgroundColor: "#f1c40f",
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  offerSubtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  offerButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 120,
  },
  offerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    fontSize: 24,
    color: '#000',
    
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
