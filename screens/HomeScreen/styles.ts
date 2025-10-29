/**
* styles.ts
* Enhanced responsive styles for HomeScreen
*/
 
import { StyleSheet, Platform } from 'react-native';
 
export const styles = (height?: number, screenWidth?: number) => {
  const isSmallDevice = screenWidth && screenWidth < 375;
  const isMediumDevice = screenWidth && screenWidth >= 375 && screenWidth < 414;
  
  return StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    
    // Banner Section
    imageContainer: {
      height: height || 450,
      width: '100%',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    bannerContent: {
      paddingBottom: isSmallDevice ? 35 : 50,
      paddingHorizontal: isSmallDevice ? 20 : 24,
      zIndex: 10,
    },
    bannerText: {
      color: '#FFFFFF',
      fontSize: isSmallDevice ? 38 : isMediumDevice ? 44 : 50,
      lineHeight: isSmallDevice ? 42 : isMediumDevice ? 48 : 54,
      fontWeight: '900',
      maxWidth: isSmallDevice ? '85%' : '75%',
      letterSpacing: -1,
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 6,
      marginBottom: 4,
    },
    buttonContainer: {
      width: isSmallDevice ? 150 : 170,
      marginTop: isSmallDevice ? 18 : 24,
      borderRadius: 30,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    buttonStyle: {
      borderRadius: 30,
      paddingVertical: isSmallDevice ? 12 : 14,
      backgroundColor: '#DB3022',
    },
    buttonTitle: {
      fontSize: isSmallDevice ? 14 : 15,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
 
    // Section Container
    sectionContainer: {
      paddingTop: 32,
      paddingBottom: 24,
      backgroundColor: 'transparent',
    },
    
    // Title Section
    titleContainer: {
      marginHorizontal: isSmallDevice ? 16 : 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    titleWrapper: {
      flex: 1,
    },
    mainTitle: {
      fontSize: isSmallDevice ? 32 : isMediumDevice ? 36 : 40,
      fontWeight: '800',
      color: '#1A1A1A',
      marginBottom: 6,
      letterSpacing: -0.5,
    },
    subTitle: {
      fontSize: isSmallDevice ? 14 : 15,
      color: '#6B7280',
      fontWeight: '400',
      marginTop: 4,
      letterSpacing: 0.1,
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    viewAllText: {
      fontSize: isSmallDevice ? 13 : 14,
      color: '#1A1A1A',
      fontWeight: '600',
      letterSpacing: 0.3,
      marginRight: 4,
    },
    arrowText: {
      fontSize: 18,
      color: '#1A1A1A',
      fontWeight: '600',
    },
 
    // Products Section
    productsScroll: {
      marginTop: 8,
    },
    productsScrollContent: {
      paddingHorizontal: isSmallDevice ? 12 : 16,
      paddingVertical: 8,
      gap: isSmallDevice ? 12 : 16,
    },
    productWrapper: {
      marginHorizontal: isSmallDevice ? 6 : 8,
      marginBottom: 12,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
      padding: 4,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    
    // Old styles for backward compatibility
    button: {
      width: 160,
      marginTop: 20,
      textAlign: "center",
    },
    text: {
      color: 'white',
      fontSize: 48,
      lineHeight: 48,
      fontWeight: '900',
      width: 235,
    },
    productContainer: {
      marginTop: 20,
      marginHorizontal: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
};