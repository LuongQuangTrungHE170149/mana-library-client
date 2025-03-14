import api from "./api";

const bookService = {
  // Get all books with pagination and filtering
  getBooks: async (page = 1, limit = 20, filters = {}) => {
    try {
      const response = await api.get("/books", {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get book by ID
  getBook: async (bookId) => {
    try {
      const response = await api.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Search books
  searchBooks: async (query, page = 1, limit = 20) => {
    try {
      const response = await api.get("/books/search", {
        params: { q: query, page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get recommendations
  getRecommendations: async () => {
    try {
      const response = await api.get("/books/recommendations");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Borrow a book
  borrowBook: async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/borrow`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Return a book
  returnBook: async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/return`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Reserve a book
  reserveBook: async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/reserve`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Cancel reservation
  cancelReservation: async (bookId) => {
    try {
      const response = await api.delete(`/books/${bookId}/reserve`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Get book by ISBN/barcode
  getBookByISBN: async (isbn) => {
    try {
      const response = await api.get(`/books/isbn/${isbn}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Librarian: Add new book
  addBook: async (bookData) => {
    try {
      const response = await api.post("/books", bookData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Librarian: Update book details
  updateBook: async (bookId, bookData) => {
    try {
      const response = await api.patch(`/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Librarian: Update book inventory count
  updateBookCount: async (bookId, count) => {
    try {
      const response = await api.patch(`/books/${bookId}/count`, { count });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Delete book
  deleteBook: async (bookId) => {
    try {
      const response = await api.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Get book borrowing statistics
  getBookStats: async () => {
    try {
      const response = await api.get("/books/stats");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Get dashboard metrics for books
  getBookMetrics: async () => {
    try {
      const response = await api.get("/books/metrics");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Import books from CSV/Excel
  importBooks: async (formData) => {
    try {
      const response = await api.post("/books/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  // Admin: Export books catalog
  exportBooks: async (format = "csv") => {
    try {
      const response = await api.get(`/books/export?format=${format}`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default bookService;
