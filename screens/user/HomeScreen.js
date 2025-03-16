import React from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const recommendedBooks = [
    {
        title: "The Great Gatsby",
        description: "A classic novel set in the Roaring Twenties.",
        image: require("./assets/gatsby.png"),
    },
    {
        title: "To Kill a Mockingbird",
        description: "A profound novel about racial injustice.",
        image: require("./assets/mockingbird.png"),
    },
    {
        title: "1984",
        description: "A dystopian novel about totalitarianism.",
        image: require("./assets/1984.png"),
    },
];

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.username}>User!</Text>
            <Text style={styles.stat}>You have completed <Text style={styles.bold}>32</Text> books so far.</Text>
            <Text style={styles.stat}>You are lending <Text style={styles.bold}>2</Text> books.</Text>

            <Text style={styles.sectionTitle}>We think you'll also like these</Text>
            <FlatList
                data={recommendedBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={styles.bookCard}>
                        <Image source={item.image} style={styles.bookImage} />
                        <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>{item.title}</Text>
                            <Text style={styles.bookDescription}>{item.description}</Text>
                        </View>
                    </View>
                )}
            />

            <Text style={styles.sectionTitle}>Recent Borrowed Books</Text>
            <TouchableOpacity>
                <Text style={styles.borrowedBook}>The Alchemist</Text>
            </TouchableOpacity>
            <Text style={styles.returnDate}>Return by Mar 24, 2024</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    stat: {
        fontSize: 16,
        marginTop: 5,
    },
    bold: {
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    bookCard: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        alignItems: "center",
    },
    bookImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    bookInfo: {
        marginLeft: 10,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bookDescription: {
        fontSize: 14,
        color: "#555",
    },
    borrowedBook: {
        fontSize: 16,
        color: "#4169E1",
        fontWeight: "bold",
        marginTop: 10,
    },
    returnDate: {
        fontSize: 14,
        color: "#555",
    },
});

export default HomeScreen;
