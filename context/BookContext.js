import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { bookService } from "../services";
import { useAuth } from "./AuthContext";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalPages: 0,
    totalItems: 0,
  });

  const { userToken } = useAuth();

  // Load books with optional filters
  const loadBooks = useCallback(
    async (page = 1, limit = 20, filters = {}) => {
      if (!userToken) return;

      setLoading(true);
      setError(null);

      try {
        const response = await bookService.getBooks(page, limit, filters);
        setBooks(response.data);
        setPagination({
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
          totalItems: response.totalItems,
        });
      } catch (err) {
        setError("Failed to load books");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  // Load a specific book
  const loadBookDetails = async (bookId) => {
    setLoading(true);
    setError(null);

    try {
      const book = await bookService.getBook(bookId);
      setCurrentBook(book);
      return book;
    } catch (err) {
      setError("Failed to load book details");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Search books
  const searchBooks = async (query, page = 1, limit = 20) => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookService.searchBooks(query, page, limit);
      return response;
    } catch (err) {
      setError("Search failed");
      console.error(err);
      return { data: [], page: 1, limit, totalPages: 0, totalItems: 0 };
    } finally {
      setLoading(false);
    }
  };

  // Borrow a book
  const borrowBook = async (bookId) => {
    setLoading(true);
    setError(null);

    try {
      await bookService.borrowBook(bookId);
      // Update borrowed books list
      const updatedBorrowed = await bookService.getBorrowedBooks();
      setBorrowedBooks(updatedBorrowed);
      return true;
    } catch (err) {
      setError("Failed to borrow book");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Return a book
  const returnBook = async (bookId) => {
    setLoading(true);
    setError(null);

    try {
      await bookService.returnBook(bookId);
      // Update borrowed books list
      const updatedBorrowed = await bookService.getBorrowedBooks();
      setBorrowedBooks(updatedBorrowed);
      return true;
    } catch (err) {
      setError("Failed to return book");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (bookId) => {
    setLoading(true);
    setError(null);

    try {
      const isFavorite = favorites.some((book) => book.id === bookId);

      if (isFavorite) {
        await bookService.removeFavorite(bookId);
        setFavorites(favorites.filter((book) => book.id !== bookId));
      } else {
        await bookService.addFavorite(bookId);
        if (currentBook && currentBook.id === bookId) {
          setFavorites([...favorites, currentBook]);
        } else {
          // Fetch updated favorites
          const updatedFavorites = await bookService.getFavorites();
          setFavorites(updatedFavorites);
        }
      }
      return true;
    } catch (err) {
      setError("Failed to update favorites");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load user's favorites when authenticated
  useEffect(() => {
    if (userToken) {
      const loadUserFavorites = async () => {
        setLoading(true);
        try {
          const favorites = await bookService.getFavorites();
          setFavorites(favorites);
        } catch (err) {
          console.error("Failed to load favorites:", err);
        } finally {
          setLoading(false);
        }
      };

      const loadUserBorrowed = async () => {
        setLoading(true);
        try {
          const borrowed = await bookService.getBorrowedBooks();
          setBorrowedBooks(borrowed);
        } catch (err) {
          console.error("Failed to load borrowed books:", err);
        } finally {
          setLoading(false);
        }
      };

      loadUserFavorites();
      loadUserBorrowed();
      loadBooks();
    }
  }, [userToken, loadBooks]);

  // Load featured and recommended books
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const response = await bookService.getBooks(1, 5, { featured: true });
        setFeaturedBooks(response.data);
      } catch (err) {
        console.error("Failed to load featured books:", err);
      }
    };

    const loadRecommendedBooks = async () => {
      if (!userToken) return;

      try {
        const recommended = await bookService.getRecommendations();
        setRecommendedBooks(recommended);
      } catch (err) {
        console.error("Failed to load recommendations:", err);
      }
    };

    loadFeaturedBooks();
    if (userToken) {
      loadRecommendedBooks();
    }
  }, [userToken]);

  return (
    <BookContext.Provider
      value={{
        books,
        featuredBooks,
        recommendedBooks,
        currentBook,
        favorites,
        borrowedBooks,
        loading,
        error,
        pagination,
        loadBooks,
        loadBookDetails,
        searchBooks,
        borrowBook,
        returnBook,
        toggleFavorite,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);

export default BookProvider;
