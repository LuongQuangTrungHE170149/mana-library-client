import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { userService, bookService } from "../services";
import { useAuth } from "./AuthContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [bookStats, setBookStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usersPagination, setUsersPagination] = useState({
    page: 1,
    limit: 20,
    totalPages: 0,
    totalItems: 0,
  });

  const { userToken, userRole } = useAuth();
  const isAdmin = userRole === "admin";

  // Load system metrics (admin only)
  const loadSystemMetrics = useCallback(async () => {
    if (!userToken || !isAdmin) return;

    setLoading(true);
    setError(null);

    try {
      const metrics = await userService.getSystemMetrics();
      setSystemMetrics(metrics);
    } catch (err) {
      setError("Failed to load system metrics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userToken, isAdmin]);

  // Load book statistics (admin only)
  const loadBookStats = useCallback(async () => {
    if (!userToken || !isAdmin) return;

    setLoading(true);
    setError(null);

    try {
      const stats = await bookService.getBookMetrics();
      setBookStats(stats);
    } catch (err) {
      setError("Failed to load book statistics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userToken, isAdmin]);

  // Load all users with pagination (admin only)
  const loadUsers = useCallback(
    async (page = 1, limit = 20) => {
      if (!userToken || !isAdmin) return;

      setLoading(true);
      setError(null);

      try {
        const response = await userService.getAllUsers(page, limit);
        setAllUsers(response.data);
        setUsersPagination({
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
          totalItems: response.totalItems,
        });
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [userToken, isAdmin]
  );

  // Load user details (admin only)
  const loadUserDetails = async (userId) => {
    if (!userToken || !isAdmin) return;

    setLoading(true);
    setError(null);

    try {
      const user = await userService.getUserById(userId);
      setSelectedUser(user);
      return user;
    } catch (err) {
      setError("Failed to load user details");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update user (admin only)
  const updateUser = async (userId, userData) => {
    if (!userToken || !isAdmin) return false;

    setLoading(true);
    setError(null);

    try {
      await userService.updateUser(userId, userData);
      // Refresh user list
      await loadUsers(usersPagination.page, usersPagination.limit);

      // Update selected user if it's the same
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, ...userData });
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

  // Change user role (admin only)
  const changeUserRole = async (userId, role) => {
    if (!userToken || !isAdmin) return false;

    setLoading(true);
    setError(null);

    try {
      await userService.changeUserRole(userId, role);
      // Refresh user list
      await loadUsers(usersPagination.page, usersPagination.limit);

      // Update selected user if it's the same
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, role });
      }
      return true;
    } catch (err) {
      setError("Failed to change user role");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Book management functions (admin only)
  const addBook = async (bookData) => {
    if (!userToken || !isAdmin) return false;

    setLoading(true);
    setError(null);

    try {
      await bookService.addBook(bookData);
      return true;
    } catch (err) {
      setError("Failed to add book");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (bookId, bookData) => {
    if (!userToken || !isAdmin) return false;

    setLoading(true);
    setError(null);

    try {
      await bookService.updateBook(bookId, bookData);
      return true;
    } catch (err) {
      setError("Failed to update book");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    if (!userToken || !isAdmin) return false;

    setLoading(true);
    setError(null);

    try {
      await bookService.deleteBook(bookId);
      return true;
    } catch (err) {
      setError("Failed to delete book");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data when authenticated as admin
  useEffect(() => {
    if (userToken && isAdmin) {
      loadSystemMetrics();
      loadBookStats();
      loadUsers();
    }
  }, [userToken, isAdmin, loadSystemMetrics, loadBookStats, loadUsers]);

  return (
    <AdminContext.Provider
      value={{
        allUsers,
        selectedUser,
        systemMetrics,
        bookStats,
        loading,
        error,
        usersPagination,
        loadUsers,
        loadUserDetails,
        updateUser,
        changeUserRole,
        loadSystemMetrics,
        loadBookStats,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

export default AdminProvider;
