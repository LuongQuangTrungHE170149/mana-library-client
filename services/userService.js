import api from "./api";

const userService = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get("/api/v1/users");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Update current user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.patch("/api/v1/users", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post("/api/v1/auth/reset", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get user's borrowed books
  getBorrowedBooks: async () => {
    try {
      const response = await api.get("/api/v1/books/borrowed");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get user's return history
  getReturnHistory: async () => {
    try {
      // This endpoint isn't directly specified, might need to be adjusted
      const response = await api.get("/api/v1/books/borrowed", {
        params: { status: "returned" },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get user's favorite books - this might need a custom endpoint
  getFavorites: async () => {
    try {
      // This endpoint isn't in the new API structure
      const response = await api.get("/api/v1/users/favorites");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Add book to favorites - this might need a custom endpoint
  addFavorite: async (bookId) => {
    try {
      // This endpoint isn't in the new API structure
      const response = await api.post(`/api/v1/users/favorites/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Remove book from favorites - this might need a custom endpoint
  removeFavorite: async (bookId) => {
    try {
      // This endpoint isn't in the new API structure
      const response = await api.delete(`/api/v1/users/favorites/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get notifications - this might need a custom endpoint
  getNotifications: async () => {
    try {
      // This endpoint isn't in the new API structure
      const response = await api.get("/api/v1/users/notifications");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Mark notification as read - this might need a custom endpoint
  markNotificationRead: async (notificationId) => {
    try {
      // This endpoint isn't in the new API structure
      const response = await api.patch(`/api/v1/users/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin/Librarian: Get all users
  getAllUsers: async (page = 1, limit = 20) => {
    try {
      const response = await api.get("/api/v1/users", {
        params: { page, limit, all: true },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin/Librarian: Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/api/v1/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin/Librarian: Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/api/v1/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Create a new user
  createUser: async (userData) => {
    try {
      const response = await api.post("/api/v1/users", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Delete a user
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/api/v1/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Change user role (now handled through the general update endpoint)
  changeUserRole: async (userId, role) => {
    try {
      const response = await api.patch(`/api/v1/users/${userId}`, { role });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get system metrics - this might need a custom endpoint
  getSystemMetrics: async () => {
    try {
      // This endpoint isn't in the new API structure
      const response = await api.get("/api/v1/admin/metrics");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default userService;
