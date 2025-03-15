import React, { createContext, useState, useCallback, useContext } from "react";
import userService from "../services/userService";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { userToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getUsers = useCallback(
    async (page = 1, limit = 10, filters = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getUsers(page, limit, filters);
        setUsers(response.users);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        });
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch users");
        return { error: err.message || "Failed to fetch users" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const getUser = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getUser(id);
        setUser(response);
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch user details");
        return { error: err.message || "Failed to fetch user details" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const updateUser = useCallback(
    async (id, userData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.updateUser(id, userData);
        setUsers((prevUsers) => prevUsers.map((user) => (user._id === id ? response : user)));
        setUser(response);
        return { success: true, user: response };
      } catch (err) {
        setError(err.message || "Failed to update user");
        return { error: err.message || "Failed to update user" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const deleteUser = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await userService.deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        if (user && user._id === id) {
          setUser(null);
        }
        return { success: true };
      } catch (err) {
        setError(err.message || "Failed to delete user");
        return { error: err.message || "Failed to delete user" };
      } finally {
        setLoading(false);
      }
    },
    [userToken, user]
  );

  const updateProfile = useCallback(
    async (userData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.updateProfile(userData);
        return { success: true, user: response };
      } catch (err) {
        setError(err.message || "Failed to update profile");
        return { error: err.message || "Failed to update profile" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const changePassword = useCallback(
    async (oldPassword, newPassword) => {
      try {
        setLoading(true);
        setError(null);
        await userService.changePassword(oldPassword, newPassword);
        return { success: true, message: "Password changed successfully" };
      } catch (err) {
        setError(err.message || "Failed to change password");
        return { error: err.message || "Failed to change password" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const getBorrowedBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getBorrowedBooks();
      setBorrowedBooks(response);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch borrowed books");
      return { error: err.message || "Failed to fetch borrowed books" };
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const getReservedBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getReservedBooks();
      setReservedBooks(response);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch reserved books");
      return { error: err.message || "Failed to fetch reserved books" };
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const getReadingHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getReadingHistory();
      setReadingHistory(response);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch reading history");
      return { error: err.message || "Failed to fetch reading history" };
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const getUserBorrowedBooks = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getUserBorrowedBooks(userId);
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch user's borrowed books");
        return { error: err.message || "Failed to fetch user's borrowed books" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const getUserReadingHistory = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getUserReadingHistory(userId);
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch user's reading history");
        return { error: err.message || "Failed to fetch user's reading history" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const value = {
    users,
    user,
    loading,
    error,
    borrowedBooks,
    reservedBooks,
    readingHistory,
    pagination,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateProfile,
    changePassword,
    getBorrowedBooks,
    getReservedBooks,
    getReadingHistory,
    getUserBorrowedBooks,
    getUserReadingHistory,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Add a hook for easier access to user context
export const useUser = () => React.useContext(UserContext);
