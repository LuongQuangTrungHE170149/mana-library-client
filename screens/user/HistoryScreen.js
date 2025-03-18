import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const borrowedBooks = [
    {
        title: "The Alchemist",
        returnDate: "Mar 24, 2024",
    },
    {
        title: "Moby-Dick",
        returnDate: "Apr 10, 2024",
    },
    {
        title: "War and Peace",
        returnDate: "May 05, 2024",
    },
];

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Borrowed Books History</Text>
            <FlatList
                data={borrowedBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <Text style={styles.bookTitle}>{item.title}</Text>
                        <Text style={styles.returnDate}>Return by: {item.returnDate}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    bookItem: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    returnDate: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});

export default HistoryScreen;