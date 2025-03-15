import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { safeScreen, importScreen } from "../utils/screenUtils";

const AdminStack = createStackNavigator();

// Use placeholders for screens that can't be resolved
const AdminLoginScreen = importScreen("../screens/admin/AdminLoginScreen", "Admin Login");
const SystemMetricsScreen = importScreen("../screens/admin/SystemMetricsScreen", "System Metrics");
const ManageBooksScreen = importScreen("../screens/admin/ManageBooksScreen", "Manage Books");
const AddBookManualScreen = importScreen("../screens/admin/AddBookManualScreen", "Add Book Manually");
const AddBookScanScreen = importScreen("../screens/admin/AddBookScanScreen", "Scan Book");
const ManageUsersScreen = importScreen("../screens/admin/ManageUsersScreen", "Manage Users");
const UserDetailScreen = importScreen("../screens/admin/UserDetailScreen", "User Details");
const ServerConfigScreen = importScreen("../screens/admin/ServerConfigScreen", "Server Configuration");

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminLogin"
        component={safeScreen(AdminLoginScreen, "Admin Login")}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="SystemMetrics"
        component={safeScreen(SystemMetricsScreen, "System Metrics")}
        options={{ title: "Dashboard" }}
      />
      <AdminStack.Screen
        name="ManageBooks"
        component={safeScreen(ManageBooksScreen, "Manage Books")}
        options={{ title: "Manage Books" }}
      />
      <AdminStack.Screen
        name="AddBookManual"
        component={safeScreen(AddBookManualScreen, "Add Book Manually")}
        options={{ title: "Add Book" }}
      />
      <AdminStack.Screen
        name="AddBookScan"
        component={safeScreen(AddBookScanScreen, "Scan Book")}
        options={{ title: "Scan Book" }}
      />
      <AdminStack.Screen
        name="ManageUsers"
        component={safeScreen(ManageUsersScreen, "Manage Users")}
        options={{ title: "Manage Users" }}
      />
      <AdminStack.Screen
        name="UserDetail"
        component={safeScreen(UserDetailScreen, "User Details")}
        options={{ title: "User Details" }}
      />
      <AdminStack.Screen
        name="ServerConfig"
        component={safeScreen(ServerConfigScreen, "Server Configuration")}
        options={{ title: "Server Configuration" }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
