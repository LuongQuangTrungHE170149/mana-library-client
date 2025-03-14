import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { userService } from "../services";
import { useAuth } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [returnHistory, setReturnHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userToken, userRole } = useAuth();

  // Load user profile
  const loadUserProfile = useCallback(async () => {
    if (!userToken) return;

    setLoading(true);
    setError(null);

    try {
      const userProfile = await userService.getProfile();
      setProfile(userProfile);
    } catch (err) {
      setError("Failed to load user profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedProfile = await userService.updateProfile(userData);
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load user history
  const loadUserHistory = useCallback(async () => {
    if (!userToken) return;

    setLoading(true);

    try {
      const [borrowed, returned] = await Promise.all([userService.getBorrowedBooks(), userService.getReturnHistory()]);

      setBorrowHistory(borrowed);
      setReturnHistory(returned);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  // Load notifications
  const loadNotifications = useCallback(async () => {
    if (!userToken) return;

    try {
      const allNotifications = await userService.getNotifications();
      setNotifications(allNotifications);
      setUnreadNotifications(allNotifications.filter((notification) => !notification.isRead).length);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  }, [userToken]);

  // Mark notification as read
  const markNotificationRead = async (notificationId) => {
    try {
      await userService.markNotificationRead(notificationId);
      setNotifications(notifications.map((notification) => (notification.id === notificationId ? { ...notification, isRead: true } : notification)));
      setUnreadNotifications(unreadNotifications - 1);
      return true;
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      return false;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      await userService.changePassword(currentPassword, newPassword);
      return true;
    } catch (err) {
      setError(err.message || "Failed to change password");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data when authenticated
  useEffect(() => {
    if (userToken) {
      loadUserProfile();
      loadUserHistory();
      loadNotifications();
    } else {
      setProfile(null);
      setBorrowHistory([]);
      setReturnHistory([]);
      setNotifications([]);
    }
  }, [userToken, loadUserProfile, loadUserHistory, loadNotifications]);

  return (
    <UserContext.Provider
      value={{
        profile,
        borrowHistory,
        returnHistory,
        notifications,
        unreadNotifications,
        loading,
        error,
        updateProfile,
        loadUserProfile,
        loadUserHistory,
        loadNotifications,
        markNotificationRead,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
