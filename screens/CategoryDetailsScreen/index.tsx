import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';

const { width } = Dimensions.get('window');

const CategoryDetailsScreen = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  // Default product data with all fields
  const defaultProduct = {
    name: "Lepakshi Handicrafts Wooden Home Decorative Etikoppaka Balaji Head",
    brand: "LEPAKSHI HANDICRAFTS",
    salePrice: 740,
    originalPrice: 970,
    discount: "24% OFF",
    rating: 4.5,
    reviews: 0,
    quantity: "1 count",
    deliveryDate: "Tuesday, 04 Nov",
    location: "Bhubaneswar",
    seller: "Lepakshi",
    cancellable: false,
    returnable: false,
    images: [
      { uri: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80" },
      { uri: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80" },
      { uri: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=800&q=80" },
    ],
    description: "Beautiful wooden decorative piece handcrafted using traditional Etikoppaka art. This colorful Balaji head is perfect for home decoration and makes a great gift.",
    details: [
      { label: "Material", value: "Wood" },
      { label: "Color", value: "Multi-color" },
      { label: "Craft Type", value: "Etikoppaka" },
      { label: "Dimensions", value: "15 x 8 x 8 cm" },
      { label: "Weight", value: "200g" },
    ],
    relatedProducts: [
      {
        id: 1,
        name: "Etikoppaka Handicrafts Wooden Balaji Idol",
        price: 850,
        image: { uri: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80" }
      },
      {
        id: 2,
        name: "Handmade Wooden Balaji Venkateswara Idol",
        price: 920,
        image: { uri: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80" }
      },
      {
        id: 3,
        name: "Traditional Etikoppaka Toy Set",
        price: 650,
        image: { uri: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&q=80" }
      },
    ],
    otherProducts: [
      {
        id: 1,
        name: "Kondapalli Dancing Dolls Medium",
        price: 1260,
        originalPrice: 2200,
        discount: "43% OFF",
        image: { uri: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&q=80" }
      },
      {
        id: 2,
        name: "Handloom Cotton Saree",
        price: 7350,
        originalPrice: 10200,
        discount: "28% OFF",
        image: { uri: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" }
      },
      {
        id: 3,
        name: "Wooden Ganesha Idol Set",
        price: 899,
        originalPrice: 1500,
        discount: "40% OFF",
        image: { uri: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80" }
      },
    ]
  };

  // Get product from route params or use default, ensuring arrays exist
  const product = route?.params?.product 
    ? {
        ...defaultProduct,
        ...route.params.product,
        relatedProducts: route.params.product.relatedProducts || defaultProduct.relatedProducts,
        otherProducts: route.params.product.otherProducts || defaultProduct.otherProducts,
      }
    : defaultProduct;

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveImageIndex(index);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Image Slider */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {product.images.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View style={styles.indicatorContainer}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  activeImageIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>

          {/* Floating Action Buttons */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#DB3022" : "#666"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
            <Ionicons name="share-social-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Brand */}
          <Text style={styles.brand}>{product.brand}</Text>

          {/* Product Name */}
          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {product.rating}</Text>
            <Text style={styles.reviewText}>
              {product.reviews === 0
                ? "Be the first to review this product"
                : `(${product.reviews} ratings)`}
            </Text>
          </View>

          {/* Quantity */}
          <Text style={styles.quantityText}>{product.quantity}</Text>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.salePrice}>₹{product.salePrice}</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
            </View>
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              activeOpacity={0.6}
            >
              <Ionicons name="remove" size={18} color="#666" />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
              activeOpacity={0.6}
            >
              <Ionicons name="add" size={18} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryContainer}>
            <Ionicons name="location-outline" size={16} color="#666" style={{ marginRight: 6 }} />
            <Text style={styles.deliveryText}>
              Delivery by <Text style={styles.deliveryDate}>{product.deliveryDate}</Text> to{' '}
              {product.location}
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Packer/Seller Name */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Seller: {product.seller}</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>View full attributes</Text>
            </TouchableOpacity>
          </View>

          {/* Expandable Sections */}
          <TouchableOpacity
            style={styles.expandableSection}
            onPress={() => toggleSection('about')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="information-circle-outline" size={22} color="#666" />
                <Text style={styles.sectionTitle}>About Product</Text>
              </View>
              <Ionicons
                name={expandedSection === 'about' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </View>
            {expandedSection === 'about' && (
              <Text style={styles.sectionContent}>{product.description}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.expandableSection}
            onPress={() => toggleSection('details')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="list-outline" size={22} color="#666" />
                <Text style={styles.sectionTitle}>Product details</Text>
              </View>
              <Ionicons
                name={expandedSection === 'details' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </View>
            {expandedSection === 'details' && (
              <View style={styles.detailsContent}>
                {product.details.map((detail, index) => (
                  <View key={index} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{detail.label}:</Text>
                    <Text style={styles.detailValue}>{detail.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>

          {/* Policies */}
          <View style={styles.policiesContainer}>
            <View style={styles.policyItem}>
              <Ionicons name="close-circle-outline" size={24} color="#666" />
              <Text style={styles.policyText}>Not Cancellable</Text>
            </View>
            <View style={styles.policyItem}>
              <Ionicons name="return-up-back-outline" size={24} color="#666" />
              <Text style={styles.policyText}>Not Returnable</Text>
            </View>
          </View>

          {/* Other Products from Seller */}
          {product.otherProducts && product.otherProducts.length > 0 && (
            <View style={styles.productsSection}>
              <Text style={styles.productsSectionTitle}>
                Other Products from seller {product.seller}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product.otherProducts.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.productCard} activeOpacity={0.8}>
                    <Image source={item.image} style={styles.productCardImage} />
                    <Text style={styles.productCardName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.productCardQuantity}>1 count</Text>
                    <View style={styles.productCardPriceRow}>
                      <Text style={styles.productCardOriginalPrice}>₹{item.originalPrice}</Text>
                      <Text style={styles.productCardDiscount}>{item.discount}</Text>
                    </View>
                    <View style={styles.productCardFooter}>
                      <Text style={styles.productCardPrice}>₹{item.price}</Text>
                      <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Similar Products */}
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <View style={styles.productsSection}>
              <Text style={styles.productsSectionTitle}>Similar Products</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product.relatedProducts.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.similarProductCard} activeOpacity={0.8}>
                    <Image source={item.image} style={styles.similarProductImage} />
                    <Text style={styles.similarProductName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.similarProductPrice}>₹{item.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Add to Cart Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            console.log('Added to cart:', product);
            // Add your cart logic here
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  imageContainer: {
    width: width,
    height: 350,
    backgroundColor: '#f8f8f8',
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 350,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#DB3022',
    width: 24,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    lineHeight: 24,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  reviewText: {
    fontSize: 12,
    color: '#666',
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  priceSection: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  salePrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 16,
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  deliveryDate: {
    fontWeight: '600',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#DB3022',
  },
  expandableSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 12,
  },
  detailsContent: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 120,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  policiesContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24,
  },
  policyItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginRight: 8,
  },
  policyText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  productsSection: {
    marginTop: 24,
  },
  productsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  productCard: {
    width: 160,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  productCardImage: {
    width: '100%',
    height: 140,
    borderRadius: 4,
    marginBottom: 8,
  },
  productCardName: {
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
    height: 32,
  },
  productCardQuantity: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  productCardPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productCardOriginalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  productCardDiscount: {
    fontSize: 10,
    color: '#00C853',
    fontWeight: '600',
  },
  productCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#FFE5E5',
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 12,
    color: '#DB3022',
    fontWeight: '600',
  },
  similarProductCard: {
    width: 120,
    marginRight: 12,
  },
  similarProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
    height: 32,
  },
  similarProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#DB3022',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ErrorBoundary(CategoryDetailsScreen);