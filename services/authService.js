import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
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
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Request password reset
  requestReset: async (email) => {
    try {
      const response = await api.post("/auth/reset/request", { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Verify reset token
  verifyResetToken: async (token) => {
    try {
      const response = await api.post("/auth/reset/verify", { token });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Complete password reset
  completeReset: async (token, newPassword) => {
    try {
      const response = await api.post("/auth/reset/complete", { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Setup 2FA
  setup2FA: async () => {
    try {
      const response = await api.post("/auth/2fa/setup");
      return response.data; // Contains QR code or setup instructions
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Verify 2FA setup
  verify2FASetup: async (code) => {
    try {
      const response = await api.post("/auth/2fa/verify", { code });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Login with 2FA
  login2FA: async (email, password, code) => {
    try {
      const response = await api.post("/auth/2fa/login", { email, password, code });
      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // OAuth login with various providers
  oauthLogin: async (provider, token) => {
    try {
      const response = await api.post(`/auth/oauth/${provider}`, { token });
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
      await api.post("/auth/logout");
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      // Still clear local storage even if API call fails
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh");
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
