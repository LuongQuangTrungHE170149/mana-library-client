import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const books = [
    {
        title: "1984",
        description: "Dystopian novel set in a totalitarian society.",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A story of racial injustice in the American South.",
    },
    {
        title: "Pride and Prejudice",
        description: "Classic novel of manners and marriage.",
    },
];

const BookListScreen = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredBooks, setFilteredBooks] = useState(books); // State for filtered book list

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text === "") {
            setFilteredBooks(books); // Reset to all books if search query is empty
        } else {
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search books..."
                value={searchQuery}
                onChangeText={handleSearch} // Update search query and filter list
            />

            <Text style={styles.sectionTitle}>Recommended books</Text>
            <FlatList
                data={filteredBooks}
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
