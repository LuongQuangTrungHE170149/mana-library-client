import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Get server URL from environment variables
const SERVER_URL = Constants.expoConfig?.extra?.serverUrl || "http://localhost:3000";

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Add a request interceptor to add the token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 (Unauthorized) responses
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("userToken");
    }
    return Promise.reject(error);
  }
);

export default api;
