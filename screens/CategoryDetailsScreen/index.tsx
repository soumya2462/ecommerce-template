import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

// Accept product from route.params
const CategoryDetailsScreen = ({ route }) => {
  const product = route.params?.product || productExample;
  return (
    <ScrollView style={styles.container}>
      {/* Product Images */}
      <ScrollView horizontal style={styles.imageSlider}>
        {product.images.map((img, i) => (
          <Image key={i} source={img} style={styles.productImage} />
        ))}
      </ScrollView>
      <Text style={styles.title}>{product.name}</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Country Of Origin: </Text>
        <Text>{product.countryOfOrigin}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Size: </Text>
        <Text>{product.size}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Brand: </Text>
        <Text>{product.brand}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Net Quantity: </Text>
        <Text>{product.netQuantity}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Manufacturer: </Text>
        <Text>{product.manufacturer}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>About Product:</Text>
        <Text>{product.description}</Text>
      </View>
      <Button title="Add To Cart" containerStyle={{ marginVertical: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  imageSlider: { flexDirection: "row", marginVertical: 10 },
  productImage: { width: 180, height: 180, marginRight: 12, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: "600", marginVertical: 10 },
  section: { marginVertical: 6 },
  label: { fontWeight: "700" },
});

export default CategoryDetailsScreen;
