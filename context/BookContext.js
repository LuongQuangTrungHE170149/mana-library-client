import React, { createContext, useState, useContext, useCallback } from "react";
import bookService from "../services/bookService";
import { AuthContext } from "./AuthContext";

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  // Get all books with filtering
  const fetchBooks = useCallback(async (page = 1, limit = 20, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getBooks(page, limit, filters);
      setBooks(data.books);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        itemsPerPage: data.itemsPerPage,
      });
      return data;
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a specific book
  const fetchBook = useCallback(async (bookId) => {
    setLoading(true);
    setError(null);
    try {
      const book = await bookService.getBook(bookId);
      setCurrentBook(book);
      return book;
    } catch (err) {
      setError("Failed to fetch book details");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search for books
  const searchBooks = useCallback(async (query, page = 1, limit = 20) => {
    if (!query || query.trim() === "") {
      setSearchResults([]);
      return { books: [] };
    }

    setLoading(true);
    setError(null);
    try {
      const data = await bookService.searchBooks(query, page, limit);
      setSearchResults(data.books);
      return data;
    } catch (err) {
      setError("Search failed");
      console.error(err);
      return { books: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  // Borrow a book
  const borrowBook = useCallback(
    async (bookId) => {
      if (!isAuthenticated) {
        setError("You must be logged in to borrow books");
        return false;
      }

      setLoading(true);
      setError(null);
      try {
        await bookService.borrowBook(bookId);
        // Update the current book if we're viewing that book
        if (currentBook && currentBook.id === bookId) {
          setCurrentBook((prev) => ({ ...prev, status: "borrowed", borrowedByMe: true }));
        }
        // Refresh borrowed books
        const borrowedData = await bookService.getBorrowedBooks();
        setBorrowedBooks(borrowedData.books || []);
        return true;
      } catch (err) {
        setError(err.message || "Failed to borrow book");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, currentBook]
  );

  // Return a book
  const returnBook = useCallback(
    async (bookId) => {
      if (!isAuthenticated) {
        setError("You must be logged in to return books");
        return false;
      }

      setLoading(true);
      setError(null);
      try {
        await bookService.returnBook(bookId);
        // Update the current book if we're viewing that book
        if (currentBook && currentBook.id === bookId) {
          setCurrentBook((prev) => ({ ...prev, status: "available", borrowedByMe: false }));
        }
        // Update the borrowed books list
        setBorrowedBooks((prev) => prev.filter((book) => book.id !== bookId));
        return true;
      } catch (err) {
        setError(err.message || "Failed to return book");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, currentBook]
  );

  // Reserve a book
  const reserveBook = useCallback(
    async (bookId) => {
      if (!isAuthenticated) {
        setError("You must be logged in to reserve books");
        return false;
      }

      setLoading(true);
      setError(null);
      try {
        await bookService.reserveBook(bookId);
        // Update the current book if we're viewing that book
        if (currentBook && currentBook.id === bookId) {
          setCurrentBook((prev) => ({ ...prev, reservedByMe: true }));
        }
        // Refresh reserved books
        const reservedData = await bookService.getReservedBooks();
        setReservedBooks(reservedData.books || []);
        return true;
      } catch (err) {
        setError(err.message || "Failed to reserve book");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, currentBook]
  );

  // Cancel reservation
  const cancelReservation = useCallback(
    async (bookId) => {
      if (!isAuthenticated) {
        setError("You must be logged in to cancel reservations");
        return false;
      }

      setLoading(true);
      setError(null);
      try {
        await bookService.cancelReservation(bookId);
        // Update the current book if we're viewing that book
        if (currentBook && currentBook.id === bookId) {
          setCurrentBook((prev) => ({ ...prev, reservedByMe: false }));
        }
        // Update the reserved books list
        setReservedBooks((prev) => prev.filter((book) => book.id !== bookId));
        return true;
      } catch (err) {
        setError(err.message || "Failed to cancel reservation");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, currentBook]
  );

  // Get user's borrowed books
  const fetchBorrowedBooks = useCallback(async () => {
    if (!isAuthenticated) {
      setBorrowedBooks([]);
      return [];
    }

    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getBorrowedBooks();
      setBorrowedBooks(data.books || []);
      return data.books || [];
    } catch (err) {
      setError("Failed to fetch borrowed books");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Get user's reserved books
  const fetchReservedBooks = useCallback(async () => {
    if (!isAuthenticated) {
      setReservedBooks([]);
      return [];
    }

    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getReservedBooks();
      setReservedBooks(data.books || []);
      return data.books || [];
    } catch (err) {
      setError("Failed to fetch reserved books");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const value = {
    books,
    currentBook,
    loading,
    error,
    searchResults,
    borrowedBooks,
    reservedBooks,
    pagination,
    fetchBooks,
    fetchBook,
    searchBooks,
    borrowBook,
    returnBook,
    reserveBook,
    cancelReservation,
    fetchBorrowedBooks,
    fetchReservedBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
