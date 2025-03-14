import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      setLoading(true);
      try {
        // Retrieve stored data
        const token = await AsyncStorage.getItem("userToken");
        const userDataString = await AsyncStorage.getItem("userData");

        if (token && userDataString) {
          const parsedUserData = JSON.parse(userDataString);
          setUserToken(token);
          setUserData(parsedUserData);
          setUserRole(parsedUserData.role || "user");
        }
      } catch (e) {
        console.error("Failed to load auth state:", e);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, password);

      // Store the token and user data
      await AsyncStorage.setItem("userToken", response.token);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));

      // Update state
      setUserToken(response.token);
      setUserData(response.user);
      setUserRole(response.user.role || "user");

      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to login");
      console.error("Login error:", err);
      return { success: false, error: err.message || "Failed to login" };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      await authService.register(userData);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to register");
      console.error("Registration error:", err);
      return { success: false, error: err.message || "Failed to register" };
    } finally {
      setLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      await authService.requestReset(email);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to process request");
      console.error("Forgot password error:", err);
      return { success: false, error: err.message || "Failed to process request" };
    } finally {
      setLoading(false);
    }
  };

  // Reset password with verification code
  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      await authService.completeReset(token, newPassword);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to reset password");
      console.error("Reset password error:", err);
      return { success: false, error: err.message || "Failed to reset password" };
    } finally {
      setLoading(false);
    }
  };

  // Verify reset code
  const verifyResetToken = async (token) => {
    setLoading(true);
    setError(null);

    try {
      await authService.verifyResetToken(token);
      return { success: true };
    } catch (err) {
      setError(err.message || "Invalid or expired code");
      console.error("Verify code error:", err);
      return { success: false, error: err.message || "Invalid or expired code" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Clear storage
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");

      // Clear state
      setUserToken(null);
      setUserData(null);
      setUserRole(null);

      // Optionally notify server about logout
      try {
        await authService.logout();
      } catch (e) {
        // Ignore server-side logout errors
        console.warn("Server logout failed, but local logout successful");
      }
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setLoading(false);
    }
  };

  // OAuth login
  const oauthLogin = async (provider, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.oauthLogin(provider, token);

      // Store the token and user data
      await AsyncStorage.setItem("userToken", response.token);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));

      // Update state
      setUserToken(response.token);
      setUserData(response.user);
      setUserRole(response.user.role || "user");

      return { success: true };
    } catch (err) {
      setError(err.message || "OAuth login failed");
      console.error("OAuth login error:", err);
      return { success: false, error: err.message || "OAuth login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile in auth context
  const updateUserData = async (updatedData) => {
    try {
      // Merge with existing user data
      const newUserData = { ...userData, ...updatedData };
      await AsyncStorage.setItem("userData", JSON.stringify(newUserData));
      setUserData(newUserData);

      // Update role if it changed
      if (updatedData.role && updatedData.role !== userRole) {
        setUserRole(updatedData.role);
      }

      return true;
    } catch (err) {
      console.error("Update user data error:", err);
      return false;
    }
  };

  // Admin login
  const adminLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // This could be a separate endpoint or may use the same login endpoint but validate role
      const response = await authService.login(email, password);

      if (response.user.role !== "admin" && response.user.role !== "librarian") {
        throw new Error("Unauthorized access. Not an admin or librarian account.");
      }

      // Store the token and user data
      await AsyncStorage.setItem("userToken", response.token);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));

      // Update state
      setUserToken(response.token);
      setUserData(response.user);
      setUserRole(response.user.role);

      return { success: true };
    } catch (err) {
      setError(err.message || "Admin login failed");
      console.error("Admin login error:", err);
      return { success: false, error: err.message || "Admin login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Provide the authentication context value
  const authContext = {
    // State
    userToken,
    userData,
    userRole,
    loading,
    error,
    isLoggedIn: !!userToken,
    isAdmin: userRole === "admin",
    isLibrarian: userRole === "librarian",

    // Methods
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyResetToken,
    oauthLogin,
    updateUserData,
    adminLogin,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
