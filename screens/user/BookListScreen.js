import React from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const books = [
    {
        title: "1984",
        description: "Dystopian novel set in a totalitarian society.",
        image: { uri: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    },
    {
        title: "To Kill a Mockingbird",
        description: "A story of racial injustice in the American South.",
        image: { uri: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    },
    {
        title: "Pride and Prejudice",
        description: "Classic novel of manners and marriage.",
        image: { uri: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    },
];

const BookListScreen = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.searchBar} placeholder="Search books..." />

            <Text style={styles.sectionTitle}>Recommended books</Text>
            <FlatList
                data={books}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={styles.bookCard}>
                        <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>{item.title}</Text>
                            <Text style={styles.bookDescription}>{item.description}</Text>
                            <TouchableOpacity style={styles.borrowButton}>
                                <Text style={styles.borrowText}>Borrow</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bookImagePlaceholder} />
                    </View>
                )}
            />

            <TouchableOpacity style={styles.showMoreButton}>
                <Text style={styles.showMoreText}>Show more</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    searchBar: {
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 15,
    },
    bookCard: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bookDescription: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
    },
    borrowButton: {
        borderWidth: 1,
        borderColor: "#6200ea",
        padding: 5,
        borderRadius: 5,
        width: 70,
        alignItems: "center",
    },
    borrowText: {
        color: "#6200ea",
    },
    bookImagePlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    showMoreButton: {
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    showMoreText: {
        fontSize: 16,
    },
});

export default BookListScreen;
