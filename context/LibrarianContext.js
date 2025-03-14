import React, { createContext, useState, useContext, useEffect } from "react";
import { bookService, userService } from "../services";

export const LibrarianContext = createContext();

export const LibrarianProvider = ({ children }) => {
  const [pendingReturns, setPendingReturns] = useState([]);
  const [pendingBorrows, setPendingBorrows] = useState([]);
  const [pendingReservations, setPendingReservations] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch librarian dashboard stats
  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const bookStats = await bookService.getBookStats();
      setDashboardStats(bookStats);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard statistics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Process book borrowing
  const processBorrow = async (bookId, userId, dueDate) => {
    setLoading(true);
    try {
      await bookService.borrowBook(bookId, userId, dueDate);
      setPendingBorrows(pendingBorrows.filter((item) => item.bookId !== bookId));
      await fetchDashboardStats();
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to process borrow");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Process book return
  const processReturn = async (bookId, userId, condition) => {
    setLoading(true);
    try {
      await bookService.returnBook(bookId, userId, condition);
      setPendingReturns(pendingReturns.filter((item) => item.bookId !== bookId));
      await fetchDashboardStats();
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to process return");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update book inventory
  const updateBookInventory = async (bookId, changes) => {
    setLoading(true);
    try {
      await bookService.updateBook(bookId, changes);
      await fetchDashboardStats();
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to update book inventory");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending returns
  const fetchPendingReturns = async () => {
    setLoading(true);
    try {
      // This would be a custom endpoint in your API
      const data = await bookService.getPendingReturns();
      setPendingReturns(data);
      setError(null);
    } catch (err) {
      setError("Failed to load pending returns");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchDashboardStats();
    fetchPendingReturns();
    // Add other initial data loading as needed
  }, []);

  return (
    <LibrarianContext.Provider
      value={{
        pendingReturns,
        pendingBorrows,
        pendingReservations,
        overdueBooks,
        dashboardStats,
        loading,
        error,
        fetchDashboardStats,
        processBorrow,
        processReturn,
        updateBookInventory,
        fetchPendingReturns,
      }}
    >
      {children}
    </LibrarianContext.Provider>
  );
};

export const useLibrarian = () => useContext(LibrarianContext);
