import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { products } from "../../utils/products";
import Header from "../../components/Header";

const FavoriteScreen = ({ navigation, route }: any) => {
  const [favorites, setFavorites] = useState(products.slice(0, 3));

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.images[0].uri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.salePrice}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addText}>Add to Bag</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeIcon}
            onPress={() => removeFromFavorites(item.id)}
          >
            <Ionicons name="heart-dislike" size={20} color="#d32f2f" />
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
 <Text style={styles.header}>My Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default FavoriteScreen;

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
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 0.5,
    borderColor: "#eee",
  },
  image: { width: "100%", height: 180 },
  info: { padding: 10 },
  name: { fontSize: 15, fontWeight: "600", color: "#333" },
  price: { fontSize: 16, color: "#d32f2f", fontWeight: "700", marginTop: 4 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d32f2f",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  addText: { color: "#fff", fontSize: 13, marginLeft: 6 },
  removeIcon: { padding: 5 },
});
