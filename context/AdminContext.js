import React, { createContext, useState, useCallback, useContext } from "react";
import adminService from "../services/adminService";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const { userToken } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getSystemStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getSystemStats();
      setStats(response);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch system stats");
      return { error: err.message || "Failed to fetch system stats" };
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const getActivityLogs = useCallback(
    async (page = 1, limit = 10, filters = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminService.getActivityLogs(page, limit, filters);
        setLogs(response.logs);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        });
        return response;
      } catch (err) {
        setError(err.message || "Failed to fetch activity logs");
        return { error: err.message || "Failed to fetch activity logs" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const updateSystemSettings = useCallback(
    async (settings) => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminService.updateSystemSettings(settings);
        return { success: true, settings: response };
      } catch (err) {
        setError(err.message || "Failed to update system settings");
        return { error: err.message || "Failed to update system settings" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const backupDatabase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.backupDatabase();
      return { success: true, backup: response };
    } catch (err) {
      setError(err.message || "Failed to backup database");
      return { error: err.message || "Failed to backup database" };
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const restoreDatabase = useCallback(
    async (backupId) => {
      try {
        setLoading(true);
        setError(null);
        await adminService.restoreDatabase(backupId);
        return { success: true, message: "Database restored successfully" };
      } catch (err) {
        setError(err.message || "Failed to restore database");
        return { error: err.message || "Failed to restore database" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const assignRole = useCallback(
    async (userId, role) => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminService.assignRole(userId, role);
        return { success: true, user: response };
      } catch (err) {
        setError(err.message || "Failed to assign role");
        return { error: err.message || "Failed to assign role" };
      } finally {
        setLoading(false);
      }
    },
    [userToken]
  );

  const value = {
    stats,
    logs,
    loading,
    error,
    pagination,
    getSystemStats,
    getActivityLogs,
    updateSystemSettings,
    backupDatabase,
    restoreDatabase,
    assignRole,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

// Add a hook for easier access to admin context
export const useAdmin = () => React.useContext(AdminContext);
