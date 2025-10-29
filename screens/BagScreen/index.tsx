import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { products } from "../../utils/products";
import Header from "../../components/Header";

const BagScreen = ({ navigation, route }: any) => {
  const [cartItems, setCartItems] = useState(
    products.slice(0, 2).map((item) => ({ ...item, quantity: 1 }))
  );

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.images[0].uri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.salePrice}</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Ionicons name="remove-circle-outline" size={22} color="#d32f2f" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Ionicons name="add-circle-outline" size={22} color="#d32f2f" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#d32f2f"
        translucent={false}
      />
 <Text style={styles.header}>My Bag</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* ✅ Sticky Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#d32f2f",
    marginVertical: 15,
    textAlign: "center",
  },

  list: { 
    padding: 10, 
    paddingBottom: 120 
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 0.5,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: { 
    width: 100, 
    height: 100, 
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: { 
    flex: 1, 
    padding: 10, 
    justifyContent: "space-between" 
  },
  name: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: "#333" 
  },
  price: { 
    fontSize: 16, 
    color: "#d32f2f", 
    fontWeight: "700",
    marginTop: 4,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  quantity: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  totalText: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#d32f2f",
    marginBottom: 2,
  },
  checkoutButton: {
    backgroundColor: "#d32f2f",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  checkoutText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});