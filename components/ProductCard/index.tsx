/**
 * ProductCard.tsx
 * Enhanced Product Card with Modern Design and Animations
 * Copyright (c) 2023 James Ugbanu.
 * Licensed under the MIT License.
 */

import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Badge, Icon, Text, useTheme } from "@rneui/themed";
import { scale, verticalScale } from "react-native-size-matters";
import { styles } from "./styles";

const { width: screenWidth } = Dimensions.get("window");

type ProductCardProps = {
  image?: any;
  imageStyle?: { [key: string]: any };
  label?: string;
  badgeStyle?: { [key: string]: any };
  buttonStyle?: { [key: string]: any };
  ratingValue?: number;
  ratingCount?: number;
  totalRating?: number;
  ratingSize?: number;
  salePrice?: number;
  price: number;
  currency?: string;
  category: string;
  name: string;
  imageWidth?: number;
  imageHeight?: number;
  button?: {
    iconName?: string;
    iconType?: string;
    iconColor?: string;
    iconSize?: number;
  };
  onPress?: () => void;
  index?: number;
  scrollY?: Animated.Value;
};

const ProductCard = (props: ProductCardProps) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  let {
    imageStyle,
    image,
    label,
    badgeStyle,
    buttonStyle = {
      backgroundColor: theme.colors.white,
    },
    ratingValue = 0,
    ratingCount = 5,
    totalRating = 0,
    ratingSize = 14,
    salePrice,
    price,
    currency = "$",
    category,
    name,
    imageWidth = screenWidth * 0.5,
    imageHeight = 150,
    button = {
      iconName: "heart-outline",
      iconType: "ionicon",
      iconColor: "#FF6B6B",
      iconSize: 20,
    },
    onPress,
    index = 0,
  } = props;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 8,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const discount = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { scale: scaleAnim },
          { translateY: translateY },
          { scale: pressAnim },
        ],
        width: imageWidth,
        marginHorizontal: scale(8),
        marginVertical: verticalScale(10),
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          overflow: "hidden",
        }}
      >
        {/* Image Container */}
        <View style={{ position: "relative", overflow: "hidden" }}>
          <Image
            source={image}
            resizeMode="cover"
            style={[
              {
                width: imageWidth,
                height: verticalScale(imageHeight),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              imageStyle,
            ]}
          />
          
          {/* Gradient Overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          />

          {/* Badge */}
          {label && (
            <View
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                backgroundColor: label === "NEW" ? theme.colors.success : theme.colors.error,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 11, fontWeight: "700" }}>
                {label}
              </Text>
            </View>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <View
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: theme.colors.error,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>
                -{discount}%
              </Text>
            </View>
          )}

          {/* Favorite Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => console.log("Favorite pressed")}
          >
            <Icon
              name={button.iconName}
              type={button.iconType}
              color={button.iconColor}
              size={button.iconSize}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={{ padding: 12 }}>
          {/* Rating */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name={i < ratingValue ? "star" : "star-outline"}
                type="ionicon"
                color={i < ratingValue ? "#FFD700" : theme.colors.grey3}
                size={ratingSize}
              />
            ))}
            {totalRating > 0 && (
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 12,
                  color: theme.colors.grey1,
                }}
              >
                ({totalRating})
              </Text>
            )}
          </View>

          {/* Category */}
          <Text
            style={{
              fontSize: 11,
              color: theme.colors.primary,
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 2,
            }}
          >
            {category}
          </Text>

          {/* Product Name */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: theme.colors.black,
              marginBottom: 6,
            }}
            numberOfLines={2}
          >
            {name}
          </Text>

          {/* Price */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {salePrice && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: theme.colors.error,
                  marginRight: 8,
                }}
              >
                {currency}{salePrice}
              </Text>
            )}
            <Text
              style={{
                fontSize: salePrice ? 14 : 16,
                fontWeight: salePrice ? "400" : "700",
                color: salePrice ? theme.colors.grey1 : theme.colors.black,
                textDecorationLine: salePrice ? "line-through" : "none",
              }}
            >
              {currency}{price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductCard;