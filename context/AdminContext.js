import React, { createContext, useState, useContext, useEffect } from "react";
import bookService from "../services/bookService";
import userService from "../services/userService";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLibrarian, setIsLibrarian] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [userBooksBorrowed, setUserBooksBorrowed] = useState([]);
  const [userBooksReserved, setUserBooksReserved] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Check admin/librarian status when user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      setIsAdmin(user.role === "admin");
      setIsLibrarian(user.role === "librarian" || user.role === "admin");
    } else {
      setIsAdmin(false);
      setIsLibrarian(false);
    }
  }, [user, isAuthenticated]);

  // Fetch all users (admin/librarian only)
  const fetchUsers = async (page = 1, limit = 20, filters = {}) => {
    if (!isAuthenticated || !isLibrarian) return null;

    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers(page, limit, filters);
      setUsers(data.users || []);
      return data;
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get specific user (admin/librarian only)
  const fetchUser = async (userId) => {
    if (!isAuthenticated || !isLibrarian) return null;

    setLoading(true);
    setError(null);
    try {
      const userData = await userService.getUser(userId);
      setSelectedUserId(userId);
      return userData;
    } catch (err) {
      setError("Failed to fetch user");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new user (admin only)
  const createUser = async (userData) => {
    if (!isAuthenticated || !isAdmin) return false;

    setLoading(true);
    setError(null);
    try {
      await userService.createUser(userData);
      // Refresh users list after creating
      await fetchUsers();
      return true;
    } catch (err) {
      setError("Failed to create user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update a user (admin/librarian)
  const updateUser = async (userId, userData) => {
    if (!isAuthenticated || !isLibrarian) return false;

    setLoading(true);
    setError(null);
    try {
      await userService.updateUser(userId, userData);
      // Update users list if it's loaded
      if (users.length > 0) {
        setUsers(users.map((user) => (user.id === userId ? { ...user, ...userData } : user)));
      }
      return true;
    } catch (err) {
      setError("Failed to update user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a user (admin only)
  const deleteUser = async (userId) => {
    if (!isAuthenticated || !isAdmin) return false;

    setLoading(true);
    setError(null);
    try {
      await userService.deleteUser(userId);
      // Update users list if it's loaded
      setUsers(users.filter((user) => user.id !== userId));
      return true;
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get books borrowed by specific user (admin/librarian)
  const fetchUserBorrowedBooks = async (userId) => {
    if (!isAuthenticated || !isLibrarian) return null;

    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getBorrowedBooksByUser(userId);
      setUserBooksBorrowed(data.books || []);
      setSelectedUserId(userId);
      return data.books || [];
    } catch (err) {
      setError("Failed to fetch user's borrowed books");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get books reserved by specific user (admin/librarian)
  const fetchUserReservedBooks = async (userId) => {
    if (!isAuthenticated || !isLibrarian) return null;

    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getReservedBooksByUser(userId);
      setUserBooksReserved(data.books || []);
      setSelectedUserId(userId);
      return data.books || [];
    } catch (err) {
      setError("Failed to fetch user's reserved books");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Borrow a book on behalf of user (admin/librarian)
  const borrowBookForUser = async (bookId, userId) => {
    if (!isAuthenticated || !isLibrarian) return false;

    setLoading(true);
    setError(null);
    try {
      await bookService.borrowBook(bookId, userId);
      // Refresh user's borrowed books if needed
      if (selectedUserId === userId) {
        await fetchUserBorrowedBooks(userId);
      }
      return true;
    } catch (err) {
      setError("Failed to borrow book for user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Return a book on behalf of user (admin/librarian)
  const returnBookForUser = async (bookId, userId, condition = null) => {
    if (!isAuthenticated || !isLibrarian) return false;

    setLoading(true);
    setError(null);
    try {
      await bookService.returnBook(bookId, userId, condition);
      // Refresh user's borrowed books if needed
      if (selectedUserId === userId) {
        await fetchUserBorrowedBooks(userId);
      }
      return true;
    } catch (err) {
      setError("Failed to return book for user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get borrowing statistics (admin)
  const fetchBookStats = async () => {
    if (!isAuthenticated || !isAdmin) return null;

    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getBookStats();
      setStats(data);
      return data;
    } catch (err) {
      setError("Failed to fetch book statistics");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Import books from file (admin)
  const importBooks = async (fileData) => {
    if (!isAuthenticated || !isAdmin) return false;

    setLoading(true);
    setError(null);
    try {
      await bookService.importBooks(fileData);
      return true;
    } catch (err) {
      setError("Failed to import books");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Export books catalog (admin)
  const exportBooks = async () => {
    if (!isAuthenticated || !isAdmin) return false;

    setLoading(true);
    setError(null);
    try {
      const blob = await bookService.exportBooks();
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "books-catalog.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      setError("Failed to export books");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAdmin,
    isLibrarian,
    loading,
    error,
    users,
    stats,
    userBooksBorrowed,
    userBooksReserved,
    selectedUserId,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    fetchUserBorrowedBooks,
    fetchUserReservedBooks,
    borrowBookForUser,
    returnBookForUser,
    fetchBookStats,
    importBooks,
    exportBooks,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
