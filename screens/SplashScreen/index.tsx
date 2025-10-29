import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const { width } = Dimensions.get("window");

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const taglineFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Complex animation sequence
    Animated.sequence([
      // Logo entrance with scale and rotation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      // Tagline slide up
      Animated.parallel([
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(taglineFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Subtle breathing effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      const isLoggedIn = false; // Check your auth logic here
      navigation.replace(isLoggedIn ? "MainApp" : "Login");
    }, 3500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, logoRotate, slideUp, taglineFade, navigation]);

  const rotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DB3022" />

      {/* Animated background circles */}
      <Animated.View
        style={[styles.circle, styles.circle1, { opacity: fadeAnim }]}
      />
      <Animated.View
        style={[styles.circle, styles.circle2, { opacity: fadeAnim }]}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate: rotation }],
          },
        ]}
      >
        <Image
          source={{
            uri: "https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/c/AmazonStores/A21TJRUUN4KGV/316a37c95d34fbd8bdb7a0685952a823.w1080.h1080._SS200_.png",
          }}
          style={{ width: 150, height: 150 ,borderRadius:75}}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomContent,
          {
            opacity: taglineFade,
            transform: [{ translateY: slideUp }],
          },
        ]}
      >
        <Text style={styles.brandName}>Lepakshi</Text>
        <View style={styles.separator} />
        <Text style={styles.tagline}>Your Fashion. Your Style.</Text>
      </Animated.View>

      {/* Loading dots */}
      <Animated.View style={[styles.dotsContainer, { opacity: taglineFade }]}>
        <LoadingDots />
      </Animated.View>
    </View>
  );
};

// Loading dots component
const LoadingDots: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.dots}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB3022",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    borderRadius: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  circle1: {
    width: width * 1.5,
    height: width * 1.5,
    top: -width * 0.5,
    right: -width * 0.3,
  },
  circle2: {
    width: width * 1.2,
    height: width * 1.2,
    bottom: -width * 0.4,
    left: -width * 0.4,
  },
  content: {
    padding:2,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  bottomContent: {
    position: "absolute",
    bottom: 120,
    alignItems: "center",
  },
  brandName: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  separator: {
    width: 60,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 15,
    color: "#FFFFFF",
    letterSpacing: 1.5,
    fontWeight: "400",
    opacity: 0.95,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 60,
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
});

export default SplashScreen;
