import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
    const { login, error, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // Kiểm tra tính hợp lệ
        if (!email || !password) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const response = await login({ email, password });

        if (response.success) {
            // Điều hướng đến màn hình chính sau khi đăng nhập thành công
            alert("Đăng nhập thành công!");
        } else {
            // Hiển thị lỗi nếu đăng nhập thất bại
            alert(error || "Đăng nhập thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Chức năng đăng ký")} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Đăng ký</Text>
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#4CAF50",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    registerButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 10,
    },
    registerButtonText: {
        color: "#4CAF50",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },
});

export default LoginScreen;