import { View, Text, Image, ImageSourcePropType, StyleSheet } from "react-native"

type CategoryProps = {
    isActive?: boolean;
    backgroundImage?: string;
    img: ImageSourcePropType;
    children: string;
    editing?: boolean;
    added?: boolean;
}

const Category: React.FC<CategoryProps> = ({isActive = true, backgroundImage, img, children}) => {
    return (
        <View style={[styles.container, !isActive ? styles.noActive : null ]}>
            <View style={[
                styles.imageContainer,
                { backgroundColor: backgroundImage || 'rgb(108, 32, 183)' }
            ]}>
                <Image source={img} style={styles.image} />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: 50,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingHorizontal: 10,
    },
    noActive: {
        backgroundColor: "#c2c2c2",
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        height: 35,
        width: 35,
    },
    textWrapper: {
        flexShrink: 1,
        paddingVertical: 5,
    },
    text: {
        fontSize: 20,
    }
})

export default Category