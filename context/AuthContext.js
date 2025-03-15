import React, { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          // Fetch user profile or verify token validity
          // This depends on your backend implementation
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Token validation failed:", err);
          authService.logout();
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);

      // Handle 2FA challenge
      if (data.requireTwoFactor) {
        setVerificationEmail(email);
        setIsVerifying(true);
        return { requireTwoFactor: true };
      }

      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      setError(err.message || "Login failed");
      return { error: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Verify 2FA code during login
  const verify2FA = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.verify2FALogin(verificationEmail, code);
      setUser(data.user);
      setIsAuthenticated(true);
      setIsVerifying(false);
      return { success: true };
    } catch (err) {
      setError(err.message || "Verification failed");
      return { error: err.message || "Verification failed" };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      setVerificationEmail(userData.email);
      return { success: true, requireVerification: data.requireVerification };
    } catch (err) {
      setError(err.message || "Registration failed");
      return { error: err.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Verify account with code
  const verifyAccount = async (code) => {
    setLoading(true);
    setError(null);
    try {
      await authService.verifyAccount(verificationEmail, code);
      return { success: true };
    } catch (err) {
      setError(err.message || "Verification failed");
      return { error: err.message || "Verification failed" };
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const resendVerificationCode = async () => {
    if (!verificationEmail) return { error: "No email to send verification code" };

    setLoading(true);
    setError(null);
    try {
      await authService.sendVerificationCode(verificationEmail);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to send verification code");
      return { error: err.message || "Failed to send verification code" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  // Password reset request
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await authService.requestPasswordReset(email);
      setVerificationEmail(email);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to request password reset");
      return { error: err.message || "Failed to request password reset" };
    } finally {
      setLoading(false);
    }
  };

  // Complete password reset
  const completePasswordReset = async (code, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await authService.completePasswordReset(verificationEmail, code, newPassword);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to reset password");
      return { error: err.message || "Failed to reset password" };
    } finally {
      setLoading(false);
    }
  };

  // Get 2FA setup QR code
  const get2FASetup = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.get2FASetup();
      return { success: true, data };
    } catch (err) {
      setError(err.message || "Failed to get 2FA setup");
      return { error: err.message || "Failed to get 2FA setup" };
    } finally {
      setLoading(false);
    }
  };

  // Enable/disable 2FA
  const toggle2FA = async (enable, code = null) => {
    setLoading(true);
    setError(null);
    try {
      await authService.toggle2FA(enable, code);
      // Update user object to reflect 2FA status
      setUser((prev) => ({
        ...prev,
        twoFactorEnabled: enable,
      }));
      return { success: true };
    } catch (err) {
      setError(err.message || `Failed to ${enable ? "enable" : "disable"} 2FA`);
      return { error: err.message || `Failed to ${enable ? "enable" : "disable"} 2FA` };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
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
