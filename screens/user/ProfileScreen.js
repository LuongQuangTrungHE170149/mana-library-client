import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const profile = {
    firstName: "John",
    lastName: "Doe",
    dob: "January 1, 1990",
    avatar: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
    },
    preferredLanguage: "English",
};

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* Profile Avatar */}
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />

            {/* Name */}
            <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
            <Text style={styles.dob}>📅 {profile.dob}</Text>

            {/* Address Card */}
            <View style={styles.addressCard}>
                <Text style={styles.sectionTitle}>🏠 Address</Text>
                <Text style={styles.address}>
                    {profile.address.street},{"\n"}
                    {profile.address.city}, {profile.address.state} {profile.address.zipCode},{"\n"}
                    {profile.address.country}
                </Text>
            </View>

            {/* Preferred Language */}
            <Text style={styles.language}>🗣 Preferred Language: <Text style={styles.languageText}>{profile.preferredLanguage}</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#007AFF",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    dob: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
    addressCard: {
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        width: "90%",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#007AFF",
    },
    address: {
        fontSize: 16,
        textAlign: "center",
        color: "#444",
    },
    language: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: "bold",
    },
    languageText: {
        fontSize: 16,
        color: "#007AFF",
    },
});

export default ProfileScreen;
