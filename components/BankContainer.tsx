import { View, StyleSheet, Text } from "react-native";
import React from "react";
import PlusIcon from "@/assets/images/icons/plus.svg"

type BankContainerProps = {
    title: string;
    // editing: boolean;
    backgroundColor: string;
    color: string;
    // emptyBank: boolean;
    isEditing: boolean;
    children: React.ReactNode;
}

const BankContainer: React.FC<BankContainerProps> = ({title, backgroundColor, color, isEditing, children}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor }]}>
                <Text style={[styles.headerText, { color }]}>
                    {title}
                </Text>
            </View>
            <View style={styles.categories}>
                {children}
            </View>
            { isEditing ?
                <View style={styles.addCategory}>
                    <PlusIcon width={30} height={30} ></PlusIcon>
                    <Text style={styles.addCategoryText}>Добавить</Text>
                </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: "100%",
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    categories: {

    },
    addCategory: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        gap: 10,
    },
    addCategoryText: {
        color: 'gray',
        fontSize: 20,
    }
})

export default BankContainer