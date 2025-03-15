import api from "./api";

const authService = {
  // ===== AUTHENTICATION =====

  // User login with credentials
  login: async (email, password) => {
    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      // If login successful, store tokens
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
      }

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Create new user account
  register: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // Force reload to clear any in-memory state
    // window.location.href = '/login';
  },

  // Refresh JWT token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/api/v1/auth/refresh", {
        refreshToken,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
      }

      return response.data;
    } catch (error) {
      // If refresh fails, logout
      authService.logout();
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Check if user is authenticated (client-side)
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Get current token (client-side)
  getToken: () => {
    return localStorage.getItem("token");
  },

  // ===== PASSWORD MANAGEMENT =====

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post("/api/v1/auth/reset", { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Complete password reset with code and new password
  completePasswordReset: async (email, code, newPassword) => {
    try {
      const response = await api.post("/api/v1/auth/reset", {
        email,
        code,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // ===== ACCOUNT VERIFICATION =====

  // Verify account with code
  verifyAccount: async (email, code) => {
    try {
      const response = await api.post("/api/v1/auth/verify", {
        email,
        code,
      });
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

  // ===== TWO-FACTOR AUTHENTICATION =====

  // Get 2FA setup QR code
  get2FASetup: async () => {
    try {
      const response = await api.get("/api/v1/auth/2fa");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Enable/disable 2FA
  toggle2FA: async (enable, code = null) => {
    try {
      const payload = { enabled: enable };

      // If enabling 2FA, provide verification code
      if (enable && code) {
        payload.code = code;
      }

      const response = await api.put("/api/v1/auth/2fa", payload);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Verify 2FA code during login
  verify2FALogin: async (email, code) => {
    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        twoFactorCode: code,
      });

      // If verification successful, store token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
      }

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default authService;
