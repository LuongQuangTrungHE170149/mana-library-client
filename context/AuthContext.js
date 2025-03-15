import React, { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as navigationUtils from "../utils/navigationUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          // Fetch user profile or verify token validity
          const userData = await authService.getUserProfile();
          setUser(userData);
          setUserToken(token);
          setUserRole(userData.role);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        await AsyncStorage.removeItem("userToken");
        setIsAuthenticated(false);
        setUser(null);
        setUserToken(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);

      if (response.requires2FA) {
        setVerificationEmail(credentials.email);
        setIsVerifying(true);
        return { requires2FA: true };
      }

      if (response.requiresVerification) {
        setVerificationEmail(credentials.email);
        return { requiresVerification: true };
      }

      const { user, token } = response;
      await AsyncStorage.setItem("userToken", token);
      setUser(user);
      setUserToken(token);
      setUserRole(user.role);
      setIsAuthenticated(true);

      return { success: true, role: user.role };
    } catch (err) {
      setError(err.message || "Failed to login");
      return { error: err.message || "Failed to login" };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      setVerificationEmail(userData.email);
      return { success: true, message: "Registration successful. Please verify your email." };
    } catch (err) {
      setError(err.message || "Registration failed");
      return { error: err.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      await AsyncStorage.removeItem("userToken");
      setUser(null);
      setUserToken(null);
      setUserRole(null);
      setIsAuthenticated(false);
      navigationUtils.reset(0, "Auth");
    } catch (err) {
      console.error("Logout failed:", err);
      // Force logout even if API call fails
      await AsyncStorage.removeItem("userToken");
      setUser(null);
      setUserToken(null);
      setUserRole(null);
      setIsAuthenticated(false);
      navigationUtils.reset(0, "Auth");
    }
  }, []);

  const verify2FA = useCallback(
    async (code) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authService.verify2FA(verificationEmail, code);
        const { user, token } = response;
        await AsyncStorage.setItem("userToken", token);
        setUser(user);
        setUserToken(token);
        setUserRole(user.role);
        setIsAuthenticated(true);
        setIsVerifying(false);
        return { success: true };
      } catch (err) {
        setError(err.message || "2FA verification failed");
        return { error: err.message || "2FA verification failed" };
      } finally {
        setLoading(false);
      }
    },
    [verificationEmail]
  );

  const verifyAccount = useCallback(
    async (code) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authService.verifyAccount(verificationEmail, code);
        return { success: true, message: "Account verified successfully" };
      } catch (err) {
        setError(err.message || "Account verification failed");
        return { error: err.message || "Account verification failed" };
      } finally {
        setLoading(false);
      }
    },
    [verificationEmail]
  );

  const resendVerificationCode = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.resendVerificationCode(verificationEmail);
      return { success: true, message: "Verification code sent" };
    } catch (err) {
      setError(err.message || "Failed to resend verification code");
      return { error: err.message || "Failed to resend verification code" };
    } finally {
      setLoading(false);
    }
  }, [verificationEmail]);

  const requestPasswordReset = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);
      await authService.requestPasswordReset(email);
      return { success: true, message: "Password reset email sent" };
    } catch (err) {
      setError(err.message || "Failed to request password reset");
      return { error: err.message || "Failed to request password reset" };
    } finally {
      setLoading(false);
    }
  }, []);

  const completePasswordReset = useCallback(async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      await authService.completePasswordReset(token, newPassword);
      return { success: true, message: "Password reset successful" };
    } catch (err) {
      setError(err.message || "Failed to reset password");
      return { error: err.message || "Failed to reset password" };
    } finally {
      setLoading(false);
    }
  }, []);

  const get2FASetup = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.get2FASetup();
      return { success: true, data: response };
    } catch (err) {
      setError(err.message || "Failed to get 2FA setup");
      return { error: err.message || "Failed to get 2FA setup" };
    } finally {
      setLoading(false);
    }
  }, []);

  const toggle2FA = useCallback(async (enabled, verificationCode = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.toggle2FA(enabled, verificationCode);

      // Update user with new 2FA status
      setUser((prevUser) => ({
        ...prevUser,
        is2FAEnabled: enabled,
      }));

      return { success: true, message: enabled ? "2FA enabled" : "2FA disabled" };
    } catch (err) {
      setError(err.message || `Failed to ${enabled ? "enable" : "disable"} 2FA`);
      return { error: err.message || `Failed to ${enabled ? "enable" : "disable"} 2FA` };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    userToken,
    userRole,
    loading,
    error,
    isAuthenticated,
    verificationEmail,
    isVerifying,
    login,
    register,
    logout,
    verify2FA,
    verifyAccount,
    resendVerificationCode,
    requestPasswordReset,
    completePasswordReset,
    get2FASetup,
    toggle2FA,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Add a hook for easier access to auth context
export const useAuth = () => React.useContext(AuthContext);
