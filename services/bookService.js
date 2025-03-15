import api from "./api";

const bookService = {
  // ===== BOOK RETRIEVAL =====

  // Get all books with filtering options
  getBooks: async (page = 1, limit = 20, filters = {}) => {
    try {
      const response = await api.get("/api/v1/books", {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get specific book details
  getBook: async (bookId) => {
    try {
      const response = await api.get(`/api/v1/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Search for books
  searchBooks: async (query, page = 1, limit = 20) => {
    try {
      const response = await api.get("/api/v1/books/search", {
        params: { query, page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // ===== BOOK MANAGEMENT (ADMIN/LIBRARIAN) =====

  // Create a new book (admin/librarian)
  addBook: async (bookData) => {
    try {
      const response = await api.post("/api/v1/books", bookData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Update a book (admin/librarian)
  updateBook: async (bookId, bookData) => {
    try {
      const response = await api.patch(`/api/v1/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Delete a book (admin/librarian)
  deleteBook: async (bookId) => {
    try {
      const response = await api.delete(`/api/v1/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // ===== BOOK ACTIONS =====

  // Borrow a book
  borrowBook: async (bookId, userId = null) => {
    try {
      // If userId is provided, it's an admin borrowing on behalf of a user
      const payload = userId ? { userId } : {};
      const response = await api.post(`/api/v1/books/${bookId}/borrow`, payload);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Return a book
  returnBook: async (bookId, userId = null, condition = null) => {
    try {
      // If userId is provided, it's an admin returning on behalf of a user
      const payload = {};
      if (userId) payload.userId = userId;
      if (condition) payload.condition = condition;

      const response = await api.post(`/api/v1/books/${bookId}/return`, payload);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Reserve a book
  reserveBook: async (bookId) => {
    try {
      const response = await api.post(`/api/v1/books/${bookId}/reserve`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Cancel reservation
  cancelReservation: async (bookId) => {
    try {
      const response = await api.post(`/api/v1/books/${bookId}/cancel-reservation`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // ===== USER BOOK COLLECTIONS =====

  // Get current user's borrowed books
  getBorrowedBooks: async () => {
    try {
      const response = await api.get("/api/v1/books/borrowed");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get current user's reserved books
  getReservedBooks: async () => {
    try {
      const response = await api.get("/api/v1/books/reserved");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // ===== ADMIN/LIBRARIAN USER BOOK MANAGEMENT =====

  // Get books borrowed by specific user (admin/librarian)
  getBorrowedBooksByUser: async (userId) => {
    try {
      const response = await api.get(`/api/v1/books/borrowed/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get books reserved by specific user (admin/librarian)
  getReservedBooksByUser: async (userId) => {
    try {
      const response = await api.get(`/api/v1/books/reserved/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // ===== ADMIN TOOLS =====

  // Get borrowing statistics (admin)
  getBookStats: async () => {
    try {
      const response = await api.get("/api/v1/books/stats");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Import books from file (admin)
  importBooks: async (fileData) => {
    try {
      const formData = new FormData();
      formData.append("booksFile", fileData);

      const response = await api.post("/api/v1/books/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Export books catalog (admin)
  exportBooks: async () => {
    try {
      const response = await api.get("/api/v1/books/export", {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default bookService;
