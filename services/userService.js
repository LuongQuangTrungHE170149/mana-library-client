import api from "./api";

const userService = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get("/users/me");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Update current user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.patch("/users/me", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post("/users/password", {
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
      const response = await api.get("/users/me/books/borrowed");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get user's return history
  getReturnHistory: async () => {
    try {
      const response = await api.get("/users/me/books/history");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get user's favorite books
  getFavorites: async () => {
    try {
      const response = await api.get("/users/me/books/favorites");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Add book to favorites
  addFavorite: async (bookId) => {
    try {
      const response = await api.post(`/users/me/books/favorites/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Remove book from favorites
  removeFavorite: async (bookId) => {
    try {
      const response = await api.delete(`/users/me/books/favorites/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get notifications
  getNotifications: async () => {
    try {
      const response = await api.get("/users/me/notifications");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    try {
      const response = await api.patch(`/users/me/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin/Librarian: Get all users
  getAllUsers: async (page = 1, limit = 20) => {
    try {
      const response = await api.get("/users", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin/Librarian: Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin/Librarian: Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Change user role
  changeUserRole: async (userId, role) => {
    try {
      const response = await api.patch(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Get system metrics
  getSystemMetrics: async () => {
    try {
      const response = await api.get("/users/metrics");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default userService;
