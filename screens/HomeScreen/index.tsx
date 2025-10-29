/**
 * HomeScreen.tsx
 * Beautiful Home Screen with Unified Color Theme & Enhanced Product Cards
 * Copyright (c) 2023 James Ugbanu.
 * Licensed under the MIT License.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Animated,
    FlatList,
    ScrollView,
    RefreshControl,
    Platform,
    Image,
    Text as RNText,
} from 'react-native';
import { Button, Text, useTheme, Icon, Badge } from '@rneui/themed';
import { useTranslation } from "react-i18next";
import { styles } from './styles';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';
import { banner } from "../../data";
import { products } from '../../utils/products';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Unified Color Palette - Beautiful and Cohesive
const COLORS = {
    primary: '#6366F1',        // Indigo - Main brand color
    primaryLight: '#818CF8',   // Light Indigo
    primaryDark: '#4F46E5',    // Dark Indigo
    secondary: '#EC4899',      // Pink accent
    accent: '#F59E0B',         // Amber accent
    success: '#10B981',        // Emerald
    background: '#F8F9FA',     // Light gray background
    cardBg: '#FFFFFF',         // White cards
    textPrimary: '#1F2937',    // Dark gray text
    textSecondary: '#6B7280',  // Medium gray text
    textLight: '#9CA3AF',      // Light gray text
    border: '#E5E7EB',         // Border color
    overlay: 'rgba(99, 102, 241, 0.15)', // Primary overlay
};

// Enhanced Blog/News Data
const blogNews = [
    {
        id: 1,
        type: 'featured',
        title: 'Lepakshi Handicrafts: Preserving Andhra\'s Rich Heritage',
        excerpt: 'An Andhra Pradesh Government Undertaking, showcases a diverse range of traditional crafts and art forms, each unique in style, theme, and expression.',
        image: "https://lepakshihandicrafts.gov.in/wp-content/uploads/2024/12/Ganesh-1-768x512-removebg-preview.png",
        date: '2025-10-28',
        category: 'Heritage',
        readTime: '5 min read',
        author: 'Cultural Affairs Dept.',
    },
    {
        id: 2,
        type: 'news',
        title: 'Supporting 2,05,000+ Artisans Across Andhra Pradesh',
        excerpt: 'Established in 1982, A.P. Handicrafts Development Corporation Ltd. promotes exceptional products while uplifting artisan communities.',
        image: "https://lepakshihandicrafts.gov.in/wp-content/uploads/2024/12/Jar-768x512-removebg-preview.png",
        date: '2025-10-25',
        category: 'Artisans',
        readTime: '4 min read',
        author: 'APHDC',
    },
    {
        id: 3,
        type: 'event',
        title: 'Traditional Craft Exhibition - Diwali Special',
        excerpt: 'Explore the finest collection of handcrafted products celebrating India\'s festive spirit.',
        image: "https://lepakshihandicrafts.gov.in/wp-content/uploads/2024/12/White-Wood-Birds-768x512-removebg-preview.png",
        date: '2025-11-05',
        category: 'Events',
        readTime: '3 min read',
        author: 'Events Team',
    },
    {
        id: 4,
        type: 'blog',
        title: 'The Art of Traditional Weaving in Andhra',
        excerpt: 'Discover the intricate techniques passed down through generations of master weavers.',
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
        date: '2025-10-20',
        category: 'Craftsmanship',
        readTime: '6 min read',
        author: 'Craft Expert',
    },
];

// Categories with unified color scheme
const enhancedCategories = [
    { 
        name: 'Agri Inputs', 
        icon: 'agriculture', 
        items: 245,
        popular: true,
    },
    { 
        name: 'Dhotis & Dhoti Pants', 
        icon: 'checkroom', 
        items: 189,
        popular: false,
    },
    { 
        name: 'Electronics', 
        icon: 'devices', 
        items: 567,
        popular: true,
    },
    { 
        name: 'Ethnic Shoes', 
        icon: 'sports-sneakers', 
        items: 324,
        popular: false,
    },
    { 
        name: 'Ethnic Wear', 
        icon: 'woman', 
        items: 892,
        popular: true,
    },
    { 
        name: 'Fashion', 
        icon: 'style', 
        items: 1234,
        popular: true,
    },
    { 
        name: 'Gloves', 
        icon: 'shopping-bag', 
        items: 156,
        popular: false,
    },
    { 
        name: 'Home & Kitchen', 
        icon: 'kitchen', 
        items: 678,
        popular: true,
    },
    { 
        name: 'Mobile Cover', 
        icon: 'phone-iphone', 
        items: 445,
        popular: false,
    },
    { 
        name: 'Pooja Needs', 
        icon: 'self-improvement', 
        items: 334,
        popular: true,
    },
    { 
        name: 'Tools and Machinery', 
        icon: 'build', 
        items: 289,
        popular: false,
    },
    { 
        name: 'Toys & Games', 
        icon: 'toys', 
        items: 512,
        popular: true,
    },
];

// Quick Services with unified colors
const quickServices = [
    { id: 1, icon: 'local-shipping', title: 'Free Delivery', subtitle: 'On orders above ₹500' },
    { id: 2, icon: 'verified-user', title: 'Authentic', subtitle: 'Government certified' },
    { id: 3, icon: 'support-agent', title: '24/7 Support', subtitle: 'Customer service' },
    { id: 4, icon: 'replay', title: 'Easy Returns', subtitle: '30 days policy' },
];

// Testimonials
const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Hyderabad',
        rating: 5,
        comment: 'Absolutely love the authentic handcrafted products! The quality is exceptional.',
        avatar: 'https://i.pravatar.cc/150?img=1',
        date: '2025-10-15',
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        location: 'Vijayawada',
        rating: 5,
        comment: 'Great initiative to support local artisans. Fast delivery and excellent packaging.',
        avatar: 'https://i.pravatar.cc/150?img=2',
        date: '2025-10-20',
    },
    {
        id: 3,
        name: 'Lakshmi Devi',
        location: 'Visakhapatnam',
        rating: 5,
        comment: 'The ethnic wear collection is stunning. Will definitely recommend to friends!',
        avatar: 'https://i.pravatar.cc/150?img=3',
        date: '2025-10-25',
    },
];

const Home = ({ navigation }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);
    
    // Categorized Products - Ensure products exist
    const [categoryProducts, setCategoryProducts] = useState({
        fashion: products.filter(p => p.category === 'Fashion' || p.category === 'Ethnic Wear').slice(0, 8),
        homeKitchen: products.filter(p => p.category === 'Home & Kitchen' || p.category === 'Home').slice(0, 8),
        electronics: products.filter(p => p.category === 'Electronics').slice(0, 8),
        agriInputs: products.filter(p => p.category === 'Agri Inputs').slice(0, 8),
    });
    
    const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 8));
    const [newArrivals, setNewArrivals] = useState(
        products.length >= 16 
            ? products.slice(8, 16) 
            : products.slice(0, Math.min(8, products.length))
    );
    const [saleProducts, setSaleProducts] = useState(products.filter(p => p.salePrice).slice(0, 8));
    const [topRated, setTopRated] = useState(products.sort((a, b) => (b.ratingValue || 0) - (a.ratingValue || 0)).slice(0, 8));
    
    const bannerHeight = screenHeight * 0.55;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        // Update Home & Kitchen products to include more products
        const homeProducts = products.filter(p => 
            p.category === 'Home & Kitchen' || 
            p.category === 'Home' ||
            p.category === 'Kitchen' ||
            p.name?.toLowerCase().includes('kitchen') ||
            p.name?.toLowerCase().includes('home')
        ).slice(0, 8);
        
        // If still not enough, add some other products
        if (homeProducts.length < 8) {
            const additionalProducts = products
                .filter(p => !homeProducts.includes(p))
                .slice(0, 8 - homeProducts.length);
            homeProducts.push(...additionalProducts);
        }

        setCategoryProducts(prev => ({
            ...prev,
            homeKitchen: homeProducts
        }));
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    // Get dynamic color for type badges
    const getTypeColor = (type) => {
        switch(type) {
            case 'featured': return COLORS.primary;
            case 'news': return COLORS.secondary;
            case 'event': return COLORS.accent;
            case 'blog': return COLORS.primaryLight;
            default: return COLORS.primary;
        }
    };

    // Enhanced Product Card Component
    const EnhancedProductCard = ({ item, index }) => {
        const [liked, setLiked] = useState(false);
        const cardAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(cardAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        }, []);

        const hasDiscount = item.salePrice && item.price > item.salePrice;
        const discountPercent = hasDiscount 
            ? Math.round(((item.price - item.salePrice) / item.price) * 100)
            : 0;

        // Safely get image URL
        const imageUrl = item.images && item.images.length > 0 
            ? item.images[0] 
            : item.image || 'https://via.placeholder.com/400x400?text=Product';

        return (
            <Animated.View
                style={{
                    opacity: cardAnim,
                    transform: [
                        {
                            scale: cardAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1],
                            }),
                        },
                    ],
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("CategoryDetails", { product: item })}
                    activeOpacity={0.95}
                    style={{
                        width: screenWidth * 0.46,
                        marginRight: 12,
                        marginBottom: 20,
                        backgroundColor: COLORS.cardBg,
                        borderRadius: 24,
                        overflow: 'hidden',
                        shadowColor: COLORS.primary,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.12,
                        shadowRadius: 16,
                        elevation: 8,
                    }}
                >
                    {/* Image Container with Gradient Overlay */}
                    <View style={{ position: 'relative', backgroundColor: '#f3f4f6' }}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={{ 
                                width: '100%', 
                                height: 220,
                                backgroundColor: '#f3f4f6',
                            }}
                            resizeMode="cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 80,
                            }}
                        />

                        {/* Top Badges */}
                        <View style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            right: 12,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View style={{ gap: 8 }}>
                                {hasDiscount && (
                                    <View style={{
                                        backgroundColor: COLORS.secondary,
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 12,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 4,
                                        shadowColor: COLORS.secondary,
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 8,
                                        elevation: 4,
                                    }}>
                                        <Icon name="local-fire-department" type="material" size={14} color="white" />
                                        <Text style={{ 
                                            color: 'white', 
                                            fontSize: 13, 
                                            fontWeight: '800',
                                            letterSpacing: 0.5,
                                        }}>
                                            {discountPercent}% OFF
                                        </Text>
                                    </View>
                                )}
                                {item.label && (
                                    <View style={{
                                        backgroundColor: COLORS.accent,
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 12,
                                        shadowColor: COLORS.accent,
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 8,
                                        elevation: 4,
                                    }}>
                                        <Text style={{ 
                                            color: 'white', 
                                            fontSize: 11, 
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5,
                                        }}>
                                            {item.label}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Wishlist Button */}
                            <TouchableOpacity
                                onPress={(e) => {
                                    e.stopPropagation();
                                    setLiked(!liked);
                                }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 8,
                                    elevation: 4,
                                }}
                            >
                                <Icon 
                                    name={liked ? "favorite" : "favorite-border"}
                                    type="material"
                                    size={20} 
                                    color={liked ? COLORS.secondary : COLORS.textLight}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Rating Badge at Bottom */}
                        {item.ratingValue && (
                            <View style={{
                                position: 'absolute',
                                bottom: 12,
                                left: 12,
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                borderRadius: 12,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.15,
                                shadowRadius: 8,
                                elevation: 4,
                            }}>
                                <Icon name="star" type="material" size={14} color={COLORS.accent} />
                                <Text style={{ 
                                    fontSize: 13, 
                                    fontWeight: '700', 
                                    color: COLORS.textPrimary 
                                }}>
                                    {item.ratingValue}
                                </Text>
                                <Text style={{ 
                                    fontSize: 11, 
                                    color: COLORS.textLight,
                                    fontWeight: '600',
                                }}>
                                    ({item.totalRating || 0})
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Content Section */}
                    <View style={{ padding: 16 }}>
                        {/* Category */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 8,
                        }}>
                            <View style={{
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: COLORS.primary,
                                marginRight: 6,
                            }} />
                            <Text style={{
                                fontSize: 11,
                                color: COLORS.primary,
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: 0.8,
                            }}>
                                {item.category || 'Product'}
                            </Text>
                        </View>

                        {/* Product Name */}
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: COLORS.textPrimary,
                            marginBottom: 12,
                            lineHeight: 20,
                        }} numberOfLines={2}>
                            {item.name || 'Product Name'}
                        </Text>

                        {/* Price Section */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 12,
                        }}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: '900',
                                        color: COLORS.primary,
                                    }}>
                                        ₹{hasDiscount ? item.salePrice : item.price}
                                    </Text>
                                    {hasDiscount && (
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLORS.textLight,
                                            textDecorationLine: 'line-through',
                                            fontWeight: '600',
                                        }}>
                                            ₹{item.price}
                                        </Text>
                                    )}
                                </View>
                                {hasDiscount && (
                                    <Text style={{
                                        fontSize: 11,
                                        color: COLORS.success,
                                        fontWeight: '700',
                                        marginTop: 2,
                                    }}>
                                        Save ₹{item.price - item.salePrice}
                                    </Text>
                                )}
                            </View>

                            {/* Add to Cart Button */}
                            <TouchableOpacity
                                onPress={(e) => {
                                    e.stopPropagation();
                                    // Add to cart logic
                                }}
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 22,
                                    backgroundColor: COLORS.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    shadowColor: COLORS.primary,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 8,
                                    elevation: 6,
                                }}
                            >
                                <Icon name="shopping-bag" type="feather" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Quick Info */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: 12,
                            borderTopWidth: 1,
                            borderTopColor: COLORS.border,
                            gap: 12,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Icon name="shield" type="feather" size={12} color={COLORS.success} />
                                <Text style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' }}>
                                    Certified
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Icon name="truck" type="feather" size={12} color={COLORS.primary} />
                                <Text style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' }}>
                                    Free Ship
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Enhanced Blog Card Component
    const BlogCard = ({ item, index }) => {
        const cardAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(cardAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        }, []);

        return (
            <Animated.View
                style={{
                    opacity: cardAnim,
                    transform: [
                        {
                            translateX: cardAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0],
                            }),
                        },
                    ],
                }}
            >
                <TouchableOpacity
                    style={{
                        width: screenWidth * 0.85,
                        marginRight: 16,
                        borderRadius: 24,
                        backgroundColor: COLORS.cardBg,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.15,
                        shadowRadius: 20,
                        elevation: 10,
                    }}
                    onPress={() => navigation.navigate('BlogDetail', { blog: item })}
                    activeOpacity={0.9}
                >
                    <View style={{ position: 'relative' }}>
                        <ImageBackground
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: 200 }}
                            resizeMode="cover"
                        >
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.4)']}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                }}
                            />
                            
                            <View style={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                flexDirection: 'row',
                                gap: 8,
                            }}>
                                <View style={{
                                    backgroundColor: getTypeColor(item.type),
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    shadowColor: getTypeColor(item.type),
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 8,
                                    elevation: 4,
                                }}>
                                    <Text style={{ color: 'white', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>
                                        {item.type}
                                    </Text>
                                </View>
                                <View style={{
                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                }}>
                                    <Text style={{ color: COLORS.textPrimary, fontSize: 11, fontWeight: '600' }}>
                                        {item.category}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: COLORS.textPrimary,
                            marginBottom: 8,
                            lineHeight: 24,
                        }} numberOfLines={2}>
                            {item.title}
                        </Text>
                        
                        <Text style={{
                            fontSize: 14,
                            color: COLORS.textSecondary,
                            lineHeight: 20,
                            marginBottom: 12,
                        }} numberOfLines={3}>
                            {item.excerpt}
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="calendar" type="feather" size={14} color={COLORS.textLight} />
                                    <Text style={{ fontSize: 12, color: COLORS.textLight, marginLeft: 4 }}>
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="clock" type="feather" size={14} color={COLORS.textLight} />
                                    <Text style={{ fontSize: 12, color: COLORS.primary, marginLeft: 4 }}>
                                        {item.readTime}
                                    </Text>
                                </View>
                            </View>
                            
                            <TouchableOpacity>
                                <Icon name="arrow-right" type="feather" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                        {item.author && (
                            <View style={{
                                marginTop: 12,
                                paddingTop: 12,
                                borderTopWidth: 1,
                                borderTopColor: COLORS.border,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Icon name="user" type="feather" size={14} color={COLORS.textLight} />
                                <Text style={{ fontSize: 12, color: COLORS.textLight, marginLeft: 6 }}>
                                    {item.author}
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Enhanced Category Chip with gradient
    const CategoryChip = ({ item, index }) => {
        const chipAnim = useRef(new Animated.Value(0)).current;
        const [pressed, setPressed] = useState(false);

        useEffect(() => {
            Animated.spring(chipAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: index * 50,
                useNativeDriver: true,
            }).start();
        }, []);

        // Alternate between primary and secondary gradient
        const gradientColors = index % 3 === 0 
            ? [COLORS.primary, COLORS.primaryLight]
            : index % 3 === 1
            ? [COLORS.secondary, COLORS.primaryLight]
            : [COLORS.accent, COLORS.secondary];

        return (
            <Animated.View
                style={{
                    opacity: chipAnim,
                    transform: [
                        {
                            scale: chipAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1],
                            }),
                        },
                    ],
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Shop', { category: item.name })}
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}
                    activeOpacity={0.9}
                    style={{
                        marginRight: 12,
                        marginBottom: 12,
                        borderRadius: 24,
                        overflow: 'hidden',
                        shadowColor: gradientColors[0],
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.3,
                        shadowRadius: 12,
                        elevation: 8,
                    }}
                >
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            paddingHorizontal: 24,
                            paddingVertical: 20,
                            minWidth: 180,
                        }}
                    >
                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginBottom: 12,
                        }}>
                            <View style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                backgroundColor: 'rgba(255,255,255,0.25)',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon name={item.icon} type="material" size={28} color="white" />
                            </View>
                            {item.popular && (
                                <View style={{
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 4,
                                    borderRadius: 12,
                                }}>
                                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>HOT</Text>
                                </View>
                            )}
                        </View>
                        <Text style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 16,
                            marginBottom: 4,
                        }}>
                            {item.name}
                        </Text>
                        <Text style={{
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: 13,
                            fontWeight: '600',
                        }}>
                            {item.items} items
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Quick Service Card
    const QuickServiceCard = ({ service, index }) => {
        const serviceAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.spring(serviceAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        }, []);

        const getIconColor = () => {
            switch(service.title) {
                case 'Free Delivery': return COLORS.primary;
                case 'Authentic': return COLORS.success;
                case '24/7 Support': return COLORS.secondary;
                case 'Easy Returns': return COLORS.accent;
                default: return COLORS.primary;
            }
        };

        return (
            <Animated.View
                style={{
                    opacity: serviceAnim,
                    transform: [
                        {
                            scale: serviceAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1],
                            }),
                        },
                    ],
                }}
            >
                <View style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: 20,
                    padding: 20,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 4,
                    minWidth: 160,
                    marginRight: 12,
                }}>
                    <View style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: `${getIconColor()}15`,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12,
                    }}>
                        <Icon name={service.icon} type="material" size={28} color={getIconColor()} />
                    </View>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '800',
                        color: COLORS.textPrimary,
                        marginBottom: 4,
                        textAlign: 'center',
                    }}>
                        {service.title}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: COLORS.textSecondary,
                        textAlign: 'center',
                        fontWeight: '600',
                    }}>
                        {service.subtitle}
                    </Text>
                </View>
            </Animated.View>
        );
    };

    // Testimonial Card
    const TestimonialCard = ({ testimonial, index }) => {
        const testAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(testAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 150,
                useNativeDriver: true,
            }).start();
        }, []);

        return (
            <Animated.View
                style={{
                    opacity: testAnim,
                    transform: [
                        {
                            translateY: testAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [30, 0],
                            }),
                        },
                    ],
                }}
            >
                <View style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 4,
                }}>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Image
                            source={{ uri: testimonial.avatar }}
                            style={{ 
                                width: 56, 
                                height: 56, 
                                borderRadius: 28,
                                marginRight: 16,
                            }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ 
                                fontSize: 16, 
                                fontWeight: '800', 
                                color: COLORS.textPrimary,
                                marginBottom: 4,
                            }}>
                                {testimonial.name}
                            </Text>
                            <Text style={{ 
                                fontSize: 13, 
                                color: COLORS.textSecondary,
                                fontWeight: '600',
                                marginBottom: 8,
                            }}>
                                {testimonial.location}
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Icon key={i} name="star" type="material" size={16} color={COLORS.accent} />
                                ))}
                            </View>
                        </View>
                    </View>
                    <Text style={{ 
                        fontSize: 14, 
                        color: COLORS.textSecondary,
                        lineHeight: 20,
                        fontWeight: '500',
                        fontStyle: 'italic',
                    }}>
                        "{testimonial.comment}"
                    </Text>
                </View>
            </Animated.View>
        );
    };

    const SectionHeader = ({ title, subtitle, icon, onViewAll }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 32,
            marginBottom: 16,
        }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {icon && (
                        <View style={{
                            backgroundColor: COLORS.primary,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name={icon} type="material" size={24} color="white" />
                        </View>
                    )}
                    <Text style={{
                        fontSize: 24,
                        fontWeight: '800',
                        color: COLORS.textPrimary,
                    }}>
                        {title}
                    </Text>
                </View>
                {subtitle && (
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.textSecondary,
                        marginTop: 4,
                        fontWeight: '500',
                        marginLeft: icon ? 48 : 0,
                    }}>
                        {subtitle}
                    </Text>
                )}
            </View>
            {onViewAll && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onViewAll}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        backgroundColor: COLORS.primary,
                        borderRadius: 16,
                        shadowColor: COLORS.primary,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: '700',
                        fontSize: 12,
                    }}>
                        View All
                    </Text>
                    <Icon name="arrow-right" type="feather" size={14} color="white" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: COLORS.background }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[COLORS.primary]}
                />
            }
            scrollEventThrottle={16}
        >
            {/* Hero Banner */}
            <Animated.View
                style={{
                    height: bannerHeight,
                    overflow: 'hidden',
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                }}
            >
                <ImageBackground
                    source={banner.image}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                >
                    <LinearGradient
                        colors={['rgba(99, 102, 241, 0.4)', 'rgba(0,0,0,0.7)']}
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            paddingHorizontal: 24,
                            paddingBottom: 50,
                        }}
                    >
                        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                            <View style={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                                alignSelf: 'flex-start',
                                marginBottom: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: COLORS.success,
                                    marginRight: 8,
                                }} />
                                <Text style={{
                                    color: COLORS.textPrimary,
                                    fontSize: 13,
                                    fontWeight: '700',
                                    letterSpacing: 1,
                                }}>
                                    GOVERNMENT CERTIFIED
                                </Text>
                            </View>
                            <Text style={{
                                color: 'white',
                                fontSize: 42,
                                fontWeight: '900',
                                marginBottom: 12,
                                textShadowColor: 'rgba(0,0,0,0.75)',
                                textShadowOffset: { width: 0, height: 4 },
                                textShadowRadius: 10,
                                lineHeight: 50,
                            }}>
                                {banner.text}
                            </Text>
                            <Text style={{
                                color: 'rgba(255,255,255,0.95)',
                                fontSize: 17,
                                fontWeight: '600',
                                marginBottom: 24,
                                lineHeight: 26,
                            }}>
                                Discover authentic handcrafted treasures from Andhra Pradesh
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Icon name="verified" type="material" size={18} color="white" />
                                    <Text style={{ color: 'white', marginLeft: 6, fontWeight: '600', fontSize: 13 }}>
                                        2,05,000+ Artisans
                                    </Text>
                                </View>
                                <View style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Icon name="storefront" type="material" size={18} color="white" />
                                    <Text style={{ color: 'white', marginLeft: 6, fontWeight: '600', fontSize: 13 }}>
                                        Since 1982
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>
                    </LinearGradient>
                </ImageBackground>
            </Animated.View>

            {/* Quick Services */}
            <View style={{ paddingVertical: 24 }}>
                <FlatList
                    horizontal
                    data={quickServices}
                    renderItem={({ item, index }) => <QuickServiceCard service={item} index={index} />}
                    keyExtractor={(item) => `service-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                />
            </View>

            {/* Categories Section */}
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '800',
                            color: COLORS.textPrimary,
                        }}>
                            Shop by Category
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: COLORS.textSecondary,
                            marginTop: 4,
                            fontWeight: '500',
                        }}>
                            Explore our diverse collection
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={enhancedCategories}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <CategoryChip item={item} index={index} />
                    )}
                />
            </View>

            {/* News & Events Section */}
            <SectionHeader
                title="News & Events"
                subtitle="Stay updated with latest happenings"
                icon="article"
                onViewAll={() => navigation.navigate('BlogList')}
            />
            
            <FlatList
                horizontal
                data={blogNews}
                renderItem={({ item, index }) => <BlogCard item={item} index={index} />}
                keyExtractor={(item) => `blog-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
                snapToInterval={screenWidth * 0.85 + 16}
                decelerationRate="fast"
            />

            {/* Featured Products */}
            <SectionHeader
                title="Featured Collection"
                subtitle="Handpicked for you"
                icon="star"
                onViewAll={() => navigation.navigate('Shop')}
            />
            
            <FlatList
                horizontal
                data={featuredProducts}
                renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                keyExtractor={(item) => `featured-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                snapToInterval={screenWidth * 0.44 + 16}
                decelerationRate="fast"
            />

            {/* Fashion & Ethnic Wear Category */}
            {categoryProducts.fashion.length > 0 && (
                <>
                    <SectionHeader
                        title="Fashion & Ethnic Wear"
                        subtitle="Traditional meets contemporary"
                        icon="checkroom"
                        onViewAll={() => navigation.navigate('Shop', { category: 'Fashion' })}
                    />
                    
                    <FlatList
                        horizontal
                        data={categoryProducts.fashion}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `fashion-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <>
                    <SectionHeader
                        title="New Arrivals"
                        subtitle="Just dropped this week"
                        icon="fiber-new"
                        onViewAll={() => navigation.navigate('Shop')}
                    />
                    
                    <FlatList
                        horizontal
                        data={newArrivals}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `new-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* Home & Kitchen Category */}
            {categoryProducts.homeKitchen.length > 0 && (
                <>
                    <SectionHeader
                        title="Home & Kitchen"
                        subtitle="Beautify your living space"
                        icon="kitchen"
                        onViewAll={() => navigation.navigate('Shop', { category: 'Home & Kitchen' })}
                    />
                    
                    <FlatList
                        horizontal
                        data={categoryProducts.homeKitchen}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `home-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* Hot Deals */}
            {saleProducts.length > 0 && (
                <>
                    <SectionHeader
                        title="Hot Deals"
                        subtitle="Limited time offers"
                        icon="local-fire-department"
                        onViewAll={() => navigation.navigate('Shop', { filter: 'sale' })}
                    />
                    
                    <FlatList
                        horizontal
                        data={saleProducts}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `sale-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* Electronics Category */}
            {categoryProducts.electronics.length > 0 && (
                <>
                    <SectionHeader
                        title="Electronics"
                        subtitle="Latest gadgets & accessories"
                        icon="devices"
                        onViewAll={() => navigation.navigate('Shop', { category: 'Electronics' })}
                    />
                    
                    <FlatList
                        horizontal
                        data={categoryProducts.electronics}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `electronics-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* Testimonials Section */}
            <SectionHeader
                title="Customer Reviews"
                subtitle="What our customers say"
                icon="chat-bubble"
                onViewAll={undefined}
            />
            
            <View style={{ paddingHorizontal: 20 }}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard 
                        key={testimonial.id} 
                        testimonial={testimonial} 
                        index={index}
                    />
                ))}
            </View>

            {/* Agri Inputs Category */}
            {categoryProducts.agriInputs.length > 0 && (
                <>
                    <SectionHeader
                        title="Agri Inputs"
                        subtitle="Quality farming essentials"
                        icon="agriculture"
                        onViewAll={() => navigation.navigate('Shop', { category: 'Agri Inputs' })}
                    />
                    
                    <FlatList
                        horizontal
                        data={categoryProducts.agriInputs}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `agri-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* Top Rated */}
            {topRated.length > 0 && (
                <>
                    <SectionHeader
                        title="Top Rated"
                        subtitle="Customer favorites"
                        icon="thumb-up"
                        onViewAll={() => navigation.navigate('Shop', { sort: 'rating' })}
                    />
                    
                    <FlatList
                        horizontal
                        data={topRated}
                        renderItem={({ item, index }) => <EnhancedProductCard item={item} index={index} />}
                        keyExtractor={(item) => `rated-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        snapToInterval={screenWidth * 0.44 + 16}
                        decelerationRate="fast"
                    />
                </>
            )}

            {/* Call to Action Banner */}
            <View style={{ 
                marginHorizontal: 20, 
                marginVertical: 40,
                borderRadius: 24,
                overflow: 'hidden',
            }}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        padding: 32,
                        alignItems: 'center',
                    }}
                >
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                        <Icon name="shopping-bag" type="feather" size={40} color="white" />
                    </View>
                    <Text style={{
                        color: 'white',
                        fontSize: 28,
                        fontWeight: '900',
                        textAlign: 'center',
                        marginBottom: 12,
                    }}>
                        Start Shopping Today
                    </Text>
                    <Text style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: 15,
                        textAlign: 'center',
                        marginBottom: 24,
                        fontWeight: '600',
                        lineHeight: 22,
                    }}>
                        Discover authentic handcrafted products and support local artisans
                    </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Shop')}
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 32,
                            paddingVertical: 16,
                            borderRadius: 24,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.2,
                            shadowRadius: 12,
                            elevation: 6,
                        }}
                    >
                        <Text style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: '800',
                        }}>
                            Explore Products
                        </Text>
                        <Icon name="arrow-right" type="feather" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            {/* Footer Info */}
            <View style={{ 
                paddingHorizontal: 20, 
                paddingBottom: 40,
                gap: 16,
            }}>
                <View style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: 20,
                    padding: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 4,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '800',
                        color: COLORS.textPrimary,
                        marginBottom: 12,
                    }}>
                        About Lepakshi Handicrafts
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.textSecondary,
                        lineHeight: 22,
                        fontWeight: '500',
                    }}>
                        A.P. Handicrafts Development Corporation Ltd. (Lepakshi) is an Andhra Pradesh Government Undertaking 
                        established in 1982 to promote and market traditional handicrafts while supporting over 2,05,000 artisans 
                        across the state.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ErrorBoundary(Home);