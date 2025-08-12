import { View, Text, Image, ImageSourcePropType, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/ui";


type CategoryProps = {
    isActive?: boolean;
    backgroundImage?: string;
    img: ImageSourcePropType;
    children: string;
    isEditing?: boolean;
    added?: boolean;
}

const Category: React.FC<CategoryProps> = ({isActive = true, backgroundImage, img, children, isEditing = false}) => {
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
            { isEditing &&
                <View style={styles.buttos}>
                    <Ionicons name="trash-outline" size={24} color={COLORS.GRAY_COLOR} />
                </View>
            }
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
        width: '100%',
        flexShrink: 1,
        paddingVertical: 5,
    },
    text: {
        fontSize: 20,
    },
    buttos: {
        paddingHorizontal: 10,
    }
})

export default Category