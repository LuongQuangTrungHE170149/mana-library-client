import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";

const SettingsScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("English");
    const [font, setFont] = useState("Default");

    const languages = ["English", "Vietnamese", "French"];
    const fonts = ["Default", "Monospace", "Serif", "Sans-serif"];

    return (
        <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
            {/* Language Selection */}
            <Text style={[styles.label, { fontFamily: font.toLowerCase() }]}>Language:</Text>
            <View style={styles.buttonGroup}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang}
                        style={[styles.button, language === lang && styles.activeButton]}
                        onPress={() => setLanguage(lang)}
                    >
                        <Text style={styles.buttonText}>{lang}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Theme Toggle */}
            <Text style={[styles.label, { fontFamily: font.toLowerCase() }]}>Dark Mode:</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />

            {/* Font Selection */}
            <Text style={[styles.label, { fontFamily: font.toLowerCase() }]}>Font:</Text>
            <View style={styles.buttonGroup}>
                {fonts.map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.button, font === f && styles.activeButton]}
                        onPress={() => setFont(f)}
                    >
                        <Text style={styles.buttonText}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 18, marginTop: 20 },
    buttonGroup: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
    button: {
        backgroundColor: "#ddd",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    activeButton: { backgroundColor: "#007BFF" },
    buttonText: { color: "#fff" },
    darkMode: { backgroundColor: "#333", color: "#fff" },
    lightMode: { backgroundColor: "#fff", color: "#000" },
});

export default SettingsScreen;
