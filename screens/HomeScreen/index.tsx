/**
 * HomeScreen.tsx
 * Enhanced Home Screen with Modern Design, Blogs & News
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
} from 'react-native';
import { Button, Text, useTheme, Icon } from '@rneui/themed';
import { useTranslation } from "react-i18next";
import { styles } from './styles';
import ProductCard from '../../components/ProductCard';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';
import { banner } from "../../data";
import { products } from '../../utils/products';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
    },
    
];

// Enhanced Categories with Icons and Colors
const enhancedCategories = [
    { name: 'Agri Inputs', icon: 'agriculture', color: '#4CAF50', gradient: ['#66BB6A', '#43A047'] },
    { name: 'Dhotis & Dhoti Pants', icon: 'checkroom', color: '#FF9800', gradient: ['#FFB74D', '#FB8C00'] },
    { name: 'Electronics', icon: 'devices', color: '#2196F3', gradient: ['#42A5F5', '#1E88E5'] },
    { name: 'Ethnic Shoes', icon: 'sports-sneakers', color: '#9C27B0', gradient: ['#AB47BC', '#8E24AA'] },
    { name: 'Ethnic Wear', icon: 'woman', color: '#E91E63', gradient: ['#EC407A', '#D81B60'] },
    { name: 'Fashion', icon: 'style', color: '#FF5722', gradient: ['#FF7043', '#F4511E'] },
    { name: 'Gloves', icon: 'back-hand', color: '#795548', gradient: ['#8D6E63', '#6D4C41'] },
    { name: 'Home & Kitchen', icon: 'kitchen', color: '#00BCD4', gradient: ['#26C6DA', '#00ACC1'] },
    { name: 'Mobile Cover', icon: 'phone-iphone', color: '#3F51B5', gradient: ['#5C6BC0', '#3949AB'] },
    { name: 'Pooja Needs', icon: 'self-improvement', color: '#FFC107', gradient: ['#FFCA28', '#FFB300'] },
    { name: 'Tools and Machinery', icon: 'build', color: '#607D8B', gradient: ['#78909C', '#546E7A'] },
    { name: 'Toys & Games', icon: 'toys', color: '#FF4081', gradient: ['#FF80AB', '#F50057'] },
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
    
    // Product sections with better categorization
    const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 8));
    const [newArrivals, setNewArrivals] = useState(products.slice(0, 8));
    const [saleProducts, setSaleProducts] = useState(products.filter(p => p.salePrice).slice(0, 8));
    const [topRated, setTopRated] = useState(products.sort((a, b) => b.ratingValue - a.ratingValue).slice(0, 8));
    
    const bannerHeight = screenHeight * 0.55;
    const isSmallDevice = screenWidth < 375;

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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    // Blog/News Card Component
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

        const getTypeColor = () => {
            switch(item.type) {
                case 'featured': return '#FF6B6B';
                case 'news': return '#4ECDC4';
                case 'event': return '#FFD93D';
                default: return theme.colors.primary;
            }
        };

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
                        backgroundColor: theme.colors.white,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.15,
                        shadowRadius: 16,
                        elevation: 8,
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
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                            }} />
                            
                            <View style={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                flexDirection: 'row',
                                gap: 8,
                            }}>
                                <View style={{
                                    backgroundColor: getTypeColor(),
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20,
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
                                    <Text style={{ color: theme.colors.black, fontSize: 11, fontWeight: '600' }}>
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
                            color: theme.colors.black,
                            marginBottom: 8,
                            lineHeight: 24,
                        }} numberOfLines={2}>
                            {item.title}
                        </Text>
                        
                        <Text style={{
                            fontSize: 14,
                            color: theme.colors.grey0,
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
                                    <Icon name="calendar" type="feather" size={14} color={theme.colors.grey0} />
                                    <Text style={{ fontSize: 12, color: theme.colors.grey0, marginLeft: 4 }}>
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="clock" type="feather" size={14} color={theme.colors.grey0} />
                                    <Text style={{ fontSize: 12, color: theme.colors.success, marginLeft: 4 }}>
                                        {item.readTime}
                                    </Text>
                                </View>
                            </View>
                            
                            <TouchableOpacity>
                                <Icon name="arrow-right" type="feather" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Enhanced Category Chip
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
                        borderRadius: 20,
                        overflow: 'hidden',
                        shadowColor: item.color,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                    }}
                >
                    <View style={{
                        backgroundColor: item.color,
                        paddingHorizontal: 20,
                        paddingVertical: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <Icon name={item.icon} type="material" size={20} color="white" />
                        <Text style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 14,
                        }}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const renderProductCard = ({ item, index }) => (
        <ProductCard
            key={item.id}
            category={item.category}
            name={item.name}
            ratingValue={item.ratingValue}
            totalRating={item.totalRating}
            price={item.price}
            salePrice={item.salePrice}
            image={item.images[0]}
            buttonStyle={{ backgroundColor: 'red' }}
            label={item.label}
            onPress={() => navigation.navigate("CategoryDetails", { product: item })}
            index={index}
            imageWidth={screenWidth * 0.50}
            imageHeight={220}
        />
    );

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
                    {icon && <Icon name={icon} type="material" size={28} color={'red'} />}
                    <Text style={{
                        fontSize: 26,
                        fontWeight: '800',
                        color: theme.colors.black,
                    }}>
                        {title}
                    </Text>
                </View>
                {subtitle && (
                    <Text style={{
                        fontSize: 14,
                        color: theme.colors.black,
                        marginTop: 4,
                        fontWeight: '500',
                    }}>
                        {subtitle}
                    </Text>
                )}
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onViewAll}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    backgroundColor: theme.colors.success,
                    borderRadius: 25,
                    shadowColor: theme.colors.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                }}
            >
                <Text style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: 14,
                }}>
                    View All
                </Text>
                <Icon name="arrow-right" type="feather" size={16} color="white" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#F8F9FA' }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.colors.primary]}
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
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 24,
                        paddingBottom: 50,
                    }}>
                        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 40,
                                fontWeight: '900',
                                marginBottom: 12,
                                textShadowColor: 'rgba(0,0,0,0.75)',
                                textShadowOffset: { width: 0, height: 4 },
                                textShadowRadius: 10,
                                lineHeight: 48,
                            }}>
                                {banner.text}
                            </Text>
                            <Text style={{
                                color: 'rgba(255,255,255,0.95)',
                                fontSize: 16,
                                fontWeight: '500',
                                marginBottom: 24,
                                lineHeight: 24,
                            }}>
                                Discover authentic handcrafted treasures from Andhra Pradesh
                            </Text>
                           
                        </Animated.View>
                    </View>
                </ImageBackground>
            </Animated.View>

            {/* Categories Section */}
            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '800',
                    color: theme.colors.black,
                    marginBottom: 16,
                }}>
                    Shop by Category
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
                title="Featured"
                subtitle="Handpicked for you"
                icon="star"
                onViewAll={() => navigation.navigate('Shop')}
            />
            
            <FlatList
                horizontal
                data={featuredProducts}
                renderItem={renderProductCard}
                keyExtractor={(item) => `featured-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                snapToInterval={screenWidth * 0.44 + 16}
                decelerationRate="fast"
            />

            {/* New Arrivals */}
            <SectionHeader
                title="New Arrivals"
                subtitle="Just dropped this week"
                icon="fiber-new"
                onViewAll={() => navigation.navigate('Shop')}
            />
            
            <FlatList
                horizontal
                data={newArrivals}
                renderItem={renderProductCard}
                keyExtractor={(item) => `new-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                snapToInterval={screenWidth * 0.44 + 16}
                decelerationRate="fast"
            />

            {/* Hot Deals */}
            <SectionHeader
                title="Hot Deals"
                subtitle="Limited time offers"
                icon="local-fire-department"
                onViewAll={() => navigation.navigate('Shop', { filter: 'sale' })}
            />
            
            <FlatList
                horizontal
                data={saleProducts}
                renderItem={renderProductCard}
                keyExtractor={(item) => `sale-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                snapToInterval={screenWidth * 0.44 + 16}
                decelerationRate="fast"
            />

            {/* Top Rated */}
            <SectionHeader
                title="Top Rated"
                subtitle="Customer favorites"
                icon="thumb-up"
                onViewAll={() => navigation.navigate('Shop', { sort: 'rating' })}
            />
            
            <FlatList
                horizontal
                data={topRated}
                renderItem={renderProductCard}
                keyExtractor={(item) => `rated-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 30 }}
                snapToInterval={screenWidth * 0.44 + 16}
                decelerationRate="fast"
            />
        </ScrollView>
    );
};

export default ErrorBoundary(Home);