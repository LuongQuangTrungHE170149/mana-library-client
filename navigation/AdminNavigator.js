import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdminLoginScreen from "../screens/admin/AdminLoginScreen";
import SystemMetricsScreen from "../screens/admin/SystemMetricsScreen";
import ManageBooksScreen from "../screens/admin/ManageBooksScreen";
import AddBookManualScreen from "../screens/admin/AddBookManualScreen";
import AddBookScanScreen from "../screens/admin/AddBookScanScreen";
import ManageUsersScreen from "../screens/admin/ManageUsersScreen";
import UserDetailScreen from "../screens/admin/UserDetailScreen";
import ServerConfigScreen from "../screens/admin/ServerConfigScreen";

const AdminStack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="SystemMetrics"
        component={SystemMetricsScreen}
        options={{ title: "Dashboard" }}
      />
      <AdminStack.Screen
        name="ManageBooks"
        component={ManageBooksScreen}
        options={{ title: "Manage Books" }}
      />
      <AdminStack.Screen
        name="AddBookManual"
        component={AddBookManualScreen}
        options={{ title: "Add Book" }}
      />
      <AdminStack.Screen
        name="AddBookScan"
        component={AddBookScanScreen}
        options={{ title: "Scan Book" }}
      />
      <AdminStack.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={{ title: "Manage Users" }}
      />
      <AdminStack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ title: "User Details" }}
      />
      <AdminStack.Screen
        name="ServerConfig"
        component={ServerConfigScreen}
        options={{ title: "Server Configuration" }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
