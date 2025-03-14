import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

// Import any additional screens that might not be part of the tab structure
// but are accessible from user flow (e.g., search results, notifications)
import BookDetailScreen from "../screens/user/BookDetailScreen";
import NotificationsScreen from "../screens/user/NotificationsScreen";
import SearchResultsScreen from "../screens/user/SearchResultsScreen";
import EditProfileScreen from "../screens/user/EditProfileScreen";

const UserStack = createStackNavigator();

const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main tab navigator as the primary interface */}
      <UserStack.Screen
        name="MainTabs"
        component={TabNavigator}
      />

      {/* Screens that can be accessed from multiple tabs or deep links */}
      <UserStack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ headerShown: true, title: "Book Details" }}
      />
      <UserStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: true, title: "Notifications" }}
      />
      <UserStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ headerShown: true, title: "Search Results" }}
      />
      <UserStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: true, title: "Edit Profile" }}
      />
    </UserStack.Navigator>
  );
};

export default UserNavigator;
