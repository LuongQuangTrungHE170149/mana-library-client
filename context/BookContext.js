import React, { createContext, useState, useCallback, useContext } from "react";
import bookService from "../services/bookService";
import { AuthContext } from "./AuthContext";

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const { userToken } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getBooks = useCallback(
    async (page = 1, limit = 10, filters = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.getBooks(page, limit, filters);
        setBooks(response.books);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        });
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch books");
        return { error: err.message || "Failed to fetch books" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const getBook = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.getBook(id);
        setBook(response);
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch book details");
        return { error: err.message || "Failed to fetch book details" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const addBook = useCallback(
    async (bookData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.addBook(bookData);
        setBooks((prevBooks) => [response, ...prevBooks]);
        return { success: true, book: response };
      } catch (err) {
        setError(err.message || "Failed to add book");
        return { error: err.message || "Failed to add book" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const updateBook = useCallback(
    async (id, bookData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.updateBook(id, bookData);
        setBooks((prevBooks) => prevBooks.map((book) => (book._id === id ? response : book)));
        setBook(response);
        return { success: true, book: response };
      } catch (err) {
        setError(err.message || "Failed to update book");
        return { error: err.message || "Failed to update book" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const deleteBook = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await bookService.deleteBook(id);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        if (book && book._id === id) {
          setBook(null);
        }
        return { success: true };
      } catch (err) {
        setError(err.message || "Failed to delete book");
        return { error: err.message || "Failed to delete book" };
      } finally {
        setLoading(false);
      }
    },
    [userToken, book]
  );

  const searchBooks = useCallback(
    async (query, filters = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.searchBooks(query, filters);
        setSearchResults(response.books);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        });
        return response;
      } catch (err) {
        setError(err.message || "Search failed");
        return { error: err.message || "Search failed" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const checkoutBook = useCallback(
    async (bookId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.checkoutBook(bookId);
        // Update the book in the list and detailed view
        setBooks((prevBooks) => prevBooks.map((book) => (book._id === bookId ? { ...book, status: "checked-out" } : book)));
        if (book && book._id === bookId) {
          setBook({ ...book, status: "checked-out" });
        }
        return { success: true, checkout: response };
      } catch (err) {
        setError(err.message || "Failed to checkout book");
        return { error: err.message || "Failed to checkout book" };
      } finally {
        setLoading(false);
      }
    },
    [userToken, book]
  );

  const returnBook = useCallback(
    async (bookId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.returnBook(bookId);
        // Update the book in the list and detailed view
        setBooks((prevBooks) => prevBooks.map((book) => (book._id === bookId ? { ...book, status: "available" } : book)));
        if (book && book._id === bookId) {
          setBook({ ...book, status: "available" });
        }
        return { success: true, return: response };
      } catch (err) {
        setError(err.message || "Failed to return book");
        return { error: err.message || "Failed to return book" };
      } finally {
        setLoading(false);
      }
    },
    [userToken, book]
  );

  const reserveBook = useCallback(
    async (bookId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.reserveBook(bookId);
        // Update the book in the list and detailed view
        setBooks((prevBooks) => prevBooks.map((book) => (book._id === bookId ? { ...book, status: "reserved" } : book)));
        if (book && book._id === bookId) {
          setBook({ ...book, status: "reserved" });
        }
        return { success: true, reservation: response };
      } catch (err) {
        setError(err.message || "Failed to reserve book");
        return { error: err.message || "Failed to reserve book" };
      } finally {
        setLoading(false);
      }
    },
    [userToken, book]
  );

  const cancelReservation = useCallback(
    async (bookId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.cancelReservation(bookId);
        // Update the book in the list and detailed view
        setBooks((prevBooks) => prevBooks.map((book) => (book._id === bookId ? { ...book, status: "available" } : book)));
        if (book && book._id === bookId) {
          setBook({ ...book, status: "available" });
        }
        return { success: true };
      } catch (err) {
        setError(err.message || "Failed to cancel reservation");
        return { error: err.message || "Failed to cancel reservation" };
      } finally {
        setLoading(false);
      }
    },
    [userToken, book]
  );

  const value = {
    books,
    book,
    loading,
    error,
    searchResults,
    pagination,
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    checkoutBook,
    returnBook,
    reserveBook,
    cancelReservation,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

// Add a hook for easier access to book context
export const useBook = () => React.useContext(BookContext);
