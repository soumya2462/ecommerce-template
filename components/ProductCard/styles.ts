import { StyleSheet } from 'react-native';

export const styles = (width?) => StyleSheet.create({
    container: {
        flexBasis: '60%',
        borderRadius: 12,
        width,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: "flex-start",
        backgroundColor:"#fff"
    },
    imageContainer: {
        flex: 1,
        width
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width
    },
    productInfo: {
        marginTop: 10,
    },
    star: {
        flexDirection: "row",
        alignContent: "center"
    },
    text: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "500"
    },
    priceContainer: {
        flexDirection: "row",
    },
    price: {
        fontSize: 14,
        color: "#9B9B9B",
        marginRight: 3
    },
    salePrice: {
        color: "#DB3022"
    }
});