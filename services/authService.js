import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      const response = await api.post("/api/v1/auth/login", { email, password });
      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Register new user account
  register: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Request password reset
  requestReset: async (email) => {
    try {
      const response = await api.post("/api/v1/auth/reset", { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Verify account or reset code
  verifyCode: async (code, email) => {
    try {
      const response = await api.post("/api/v1/auth/verify", { code, email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Send verification code
  sendVerificationCode: async (email) => {
    try {
      const response = await api.post("/api/v1/auth/send-code", { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get 2FA setup (returns QR code)
  setup2FA: async () => {
    try {
      const response = await api.get("/api/v1/auth/2fa");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Toggle 2FA status
  toggle2FA: async (enabled, code) => {
    try {
      const response = await api.put("/api/v1/auth/2fa", { enabled, code });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Login with 2FA
  login2FA: async (email, password, code) => {
    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        password,
        code,
      });
      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Logout and clear storage
  logout: async () => {
    try {
      // Clear local storage
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      return true;
    } catch (error) {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post("/api/v1/auth/refresh");
      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get current authentication status
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem("userToken");
    return !!token;
  },

  // Get current user data
  getCurrentUser: async () => {
    const userData = await AsyncStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },
};

export default authService;
