import React, { createContext, useState, useEffect, useContext } from "react";
import userService from "../services/userService";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user: authUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Load user profile when authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        setUser(null);
        return;
      }

      setLoading(true);
      try {
        const userData = await userService.getProfile();
        setUser(userData);

        // Load favorites
        const favoritesData = await userService.getFavorites();
        setFavorites(favoritesData.favorites || []);

        // Load notifications
        const notificationsData = await userService.getNotifications();
        setNotifications(notificationsData.notifications || []);
        setUnreadNotifications(notificationsData.notifications.filter((n) => !n.isRead).length);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, authUser]);

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateProfile(userData);
      setUser(updatedUser);
      return { success: true };
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
      return { error: err.message || "Failed to update profile" };
    } finally {
      setLoading(false);
    }
  };

  // Add book to favorites
  const addToFavorites = async (bookId) => {
    setLoading(true);
    setError(null);
    try {
      await userService.addFavorite(bookId);
      // Refresh favorites list
      const favoritesData = await userService.getFavorites();
      setFavorites(favoritesData.favorites || []);
      return true;
    } catch (err) {
      setError("Failed to add to favorites");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove book from favorites
  const removeFromFavorites = async (bookId) => {
    setLoading(true);
    setError(null);
    try {
      await userService.removeFavorite(bookId);
      // Update local state without another API call
      setFavorites(favorites.filter((book) => book.id !== bookId));
      return true;
    } catch (err) {
      setError("Failed to remove from favorites");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if a book is in favorites
  const isBookFavorited = (bookId) => {
    return favorites.some((book) => book.id === bookId);
  };

  // Mark notification as read
  const markNotificationRead = async (notificationId) => {
    try {
      await userService.markNotificationRead(notificationId);
      // Update local state
      const updatedNotifications = notifications.map((notification) => (notification.id === notificationId ? { ...notification, isRead: true } : notification));
      setNotifications(updatedNotifications);
      setUnreadNotifications((prev) => Math.max(0, prev - 1));
      return true;
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      return false;
    }
  };

  // Mark all notifications as read
  const markAllNotificationsRead = async () => {
    try {
      await userService.markAllNotificationsRead();
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
      setNotifications(updatedNotifications);
      setUnreadNotifications(0);
      return true;
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      return false;
    }
  };

  // Refresh notifications
  const refreshNotifications = async () => {
    try {
      const notificationsData = await userService.getNotifications();
      setNotifications(notificationsData.notifications || []);
      setUnreadNotifications(notificationsData.notifications.filter((n) => !n.isRead).length);
      return true;
    } catch (err) {
      console.error("Failed to refresh notifications:", err);
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    favorites,
    notifications,
    unreadNotifications,
    updateProfile,
    addToFavorites,
    removeFromFavorites,
    isBookFavorited,
    markNotificationRead,
    markAllNotificationsRead,
    refreshNotifications,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
