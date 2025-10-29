/**
 * CategoryScreen.tsx
 * Enhanced Category Screen with FlatList and Animations
 * Copyright (c) 2023 James Ugbanu.
 * Licensed under the MIT License.
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    RefreshControl,
    Dimensions,
} from 'react-native';
import { useTheme, Text, Icon } from '@rneui/themed';
import { ActionSheetRef } from "react-native-actions-sheet";
import { styles } from './styles';
import ProductCard from '../../components/ProductCard';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';
import AppContainer from '../../components/HOC/AppContainer';
import { tags, sortItems } from "../../data";
import Dialog from "../../components/Dialog";
import SortBy from "./SortBy";
import { products as allProducts } from '../../utils/products';

const { width: screenWidth } = Dimensions.get('window');

const Category = ({ route, navigation }) => {
    const { theme } = useTheme();
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    const [currentSortIndex, setCurrentSort] = useState(3);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    
    const category: string = route.params?.category || "All Products";

    useEffect(() => {
        loadProducts();
        // Animate header on mount
        Animated.parallel([
            Animated.spring(headerAnim, {
                toValue: 1,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [category, currentSortIndex]);

    const loadProducts = useCallback(() => {
        setLoading(true);
        try {
            // Simulate API delay for better UX
            setTimeout(() => {
                let filteredProducts = category === "All Products"
                    ? allProducts
                    : allProducts.filter(product => product.category === category);

                filteredProducts = sortProducts(filteredProducts, currentSortIndex);
                setProducts(filteredProducts);
                setLoading(false);
                setRefreshing(false);
            }, 500);
        } catch (error) {
            console.error('Error loading products:', error);
            setProducts([]);
            setLoading(false);
            setRefreshing(false);
        }
    }, [category, currentSortIndex]);

    const sortProducts = (productsToSort, sortIndex) => {
        const sortedProducts = [...productsToSort];
        
        switch(sortIndex) {
            case 0: // Popularity
                return sortedProducts.sort((a, b) => b.totalRating - a.totalRating);
            case 1: // Price: Low to High
                return sortedProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
            case 2: // Price: High to Low
                return sortedProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
            case 3: // Newest First
                return sortedProducts.sort((a, b) => b.id - a.id);
            case 4: // Rating
                return sortedProducts.sort((a, b) => b.ratingValue - a.ratingValue);
            case 5: // Discount
                return sortedProducts.sort((a, b) => {
                    const discountA = a.salePrice ? ((a.price - a.salePrice) / a.price) * 100 : 0;
                    const discountB = b.salePrice ? ((b.price - b.salePrice) / b.price) * 100 : 0;
                    return discountB - discountA;
                });
            default:
                return sortedProducts;
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadProducts();
    }, [loadProducts]);

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
    };

    const renderProduct = ({ item, index }) => (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [
                    {
                        translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                        }),
                    },
                ],
            }}
        >
            <ProductCard
                key={item.id}
                category={item.category}
                name={item.name}
                ratingValue={item.ratingValue}
                totalRating={item.totalRating}
                price={item.price}
                salePrice={item.salePrice}
                image={item.images[0]}
                buttonStyle={{ backgroundColor: theme.colors.white }}
                label={item.discount}
                badgeStyle={item.discount && { backgroundColor: theme.colors.error }}
                onPress={() => navigation.navigate("CategoryDetails", { product: item })}
                index={index}
                imageWidth={viewMode === 'grid' ? screenWidth * 0.44 : screenWidth * 0.92}
                imageHeight={viewMode === 'grid' ? 220 : 300}
            />
        </Animated.View>
    );

    const ListHeaderComponent = () => (
        <Animated.View
            style={[
                {
                    opacity: headerAnim,
                    transform: [
                        {
                            scale: headerAnim,
                        },
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, -50],
                                extrapolate: 'clamp',
                            }),
                        },
                    ],
                    backgroundColor: theme.colors.background,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.grey5,
                    marginBottom: 10,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text h3 style={{ color: theme.colors.black, fontWeight: '700' }}>
                    {category}
                </Text>
                <Text style={{ color: theme.colors.grey1, fontSize: 14 }}>
                    {products.length} items
                </Text>
            </View>
            
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 12,
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: theme.colors.grey5,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}
                    onPress={() => navigation.navigate('ProductFilter')}
                >
                    <Icon type="material-icons" size={20} name="tune" color={theme.colors.black} />
                    <Text style={{ marginLeft: 6, fontSize: 14, fontWeight: '600' }}>Filters</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: theme.colors.grey5,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}
                    onPress={() => actionSheetRef.current?.show()}
                >
                    <Icon type="material-icons" size={20} name="sort" color={theme.colors.black} />
                    <Text style={{ marginLeft: 6, fontSize: 14, fontWeight: '600' }}>
                        {sortItems[currentSortIndex]?.name || 'Sort'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: theme.colors.grey5,
                        padding: 8,
                        borderRadius: 20,
                    }}
                    onPress={toggleViewMode}
                >
                    <Icon
                        type="material-icons"
                        size={20}
                        name={viewMode === 'grid' ? 'view-list' : 'grid-view'}
                        color={theme.colors.black}
                    />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const ListEmptyComponent = () => (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 100,
        }}>
            <Icon
                type="material-icons"
                name="shopping-bag"
                size={80}
                color={theme.colors.grey3}
            />
            <Text h4 style={{ marginTop: 16, color: theme.colors.grey1 }}>
                No products found
            </Text>
            <Text style={{ marginTop: 8, color: theme.colors.grey2, textAlign: 'center' }}>
                Try adjusting your filters or browse other categories
            </Text>
            <TouchableOpacity
                style={{
                    marginTop: 24,
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 25,
                }}
                onPress={() => navigation.navigate('Shop')}
            >
                <Text style={{ color: 'white', fontWeight: '600' }}>
                    Browse All Products
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <AppContainer>
            <View style={{ flex: 1, backgroundColor: theme.colors.grey5 }}>
                <Animated.FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={viewMode === 'grid' ? 2 : 1}
                    key={viewMode} // Force re-render when view mode changes
                    columnWrapperStyle={viewMode === 'grid' ? {
                        justifyContent: 'space-evenly',
                    } : null}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={ListHeaderComponent}
                    ListEmptyComponent={!loading && ListEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[theme.colors.primary]}
                            tintColor={theme.colors.primary}
                        />
                    }
                  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Changed to false
)}
                    scrollEventThrottle={16}
                    initialNumToRender={6}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    removeClippedSubviews={true}
                />

                {loading && (
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={{ marginTop: 10, color: theme.colors.grey1 }}>
                            Loading products...
                        </Text>
                    </View>
                )}
            </View>

            <Dialog actionSheetRef={actionSheetRef}>
                <SortBy
                    sortItems={sortItems}
                    setCurrentSort={setCurrentSort}
                    currentSortIndex={currentSortIndex}
                />
            </Dialog>
        </AppContainer>
    );
};

export default ErrorBoundary(Category);