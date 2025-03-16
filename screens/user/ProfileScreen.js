import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const profile = {
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    avatar: "https://via.placeholder.com/100",
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
    },
    preferredLanguage: "ENGLISH",
};

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
            <Text style={styles.dob}>Date of Birth: {profile.dob}</Text>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.address}>{profile.address.street}, {profile.address.city}, {profile.address.state}, {profile.address.zipCode}, {profile.address.country}</Text>
            <Text style={styles.language}>Preferred Language: {profile.preferredLanguage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    dob: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
    },
    address: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 5,
    },
    language: {
        fontSize: 16,
        marginTop: 10,
        fontStyle: "italic",
    },
});

export default ProfileScreen;