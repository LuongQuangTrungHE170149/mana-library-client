import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as navigationUtils from "../utils/navigationUtils";

const EmptyScreen = ({ routeName }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Determine which navigation context we're in
  const navigatorContext = useMemo(() => {
    try {
      // Check the navigation state to determine context
      const state = navigationUtils.getState();
      if (!state) return "user"; // Default to user

      // Examine the state and parent navigators to determine context
      const rootRouteNames = state.routeNames || [];
      const parentState = navigation.getParent()?.getState();
      const parentRouteNames = parentState?.routeNames || [];
      const allRouteNames = [...rootRouteNames, ...parentRouteNames];

      if (allRouteNames.includes("AdminLogin") || allRouteNames.includes("SystemMetrics")) {
        return "admin";
      } else if (allRouteNames.includes("Dashboard") || allRouteNames.includes("Circulation")) {
        return "librarian";
      } else {
        return "user";
      }
    } catch (error) {
      console.warn("Error determining navigation context:", error);
      return "user"; // Default to user on error
    }
  }, [navigation]);

  // Define tab items based on context
  const tabItems = useMemo(() => {
    switch (navigatorContext) {
      case "admin":
        return [
          { name: "Dashboard", icon: "dashboard", navigateTo: "SystemMetrics" },
          { name: "Books", icon: "library-books", navigateTo: "ManageBooks" },
          { name: "Users", icon: "people", navigateTo: "ManageUsers" },
          { name: "Config", icon: "settings", navigateTo: "ServerConfig" },
        ];
      case "librarian":
        return [
          { name: "Dashboard", icon: "dashboard", navigateTo: "Dashboard" },
          { name: "Books", icon: "library-books", navigateTo: "Books" },
          { name: "Circulation", icon: "swap-horiz", navigateTo: "Circulation" },
          { name: "Members", icon: "people", navigateTo: "Members" },
          { name: "Reports", icon: "analytics", navigateTo: "Reports" },
        ];
      default: // user
        return [
          { name: "Home", icon: "home", navigateTo: "HomeTab" },
          { name: "Books", icon: "library-books", navigateTo: "BooksTab" },
          { name: "Profile", icon: "person", navigateTo: "ProfileTab" },
          { name: "History", icon: "history", navigateTo: "HistoryTab" },
          { name: "Settings", icon: "settings", navigateTo: "SettingsTab" },
        ];
    }
  }, [navigatorContext]);

  // Function to navigate to a tab
  const navigateToTab = (tabName) => {
    try {
      // Get navigation states to determine correct navigation path
      const state = navigation.getState();
      const parentState = navigation.getParent()?.getState();

      // Try to navigate based on context
      switch (navigatorContext) {
        case "admin":
          // Check if we're already in admin stack
          if (state && state.routeNames.includes(tabName)) {
            navigation.navigate(tabName);
          } else {
            // Need to go through parent if in a nested navigator
            navigationUtils.navigateNested(["Admin", tabName]);
          }
          break;

        case "librarian":
          // Special handling for Books tab which is a stack navigator
          if (tabName === "Books") {
            if (state && state.routeNames.includes("Books")) {
              navigation.navigate("Books", { screen: "ManageBooks" });
            } else {
              navigationUtils.navigateNested(["Librarian", "LibrarianTabs", "Books"]);
            }
          } else {
            if (state && state.routeNames.includes(tabName)) {
              navigation.navigate(tabName);
            } else {
              navigationUtils.navigateNested(["Librarian", "LibrarianTabs", tabName]);
            }
          }
          break;

        default: // user
          // Check if we're in the main tabs or need to navigate through MainTabs
          if (state && state.routeNames.includes(tabName)) {
            navigation.navigate(tabName);
          } else if (state && state.routeNames.includes("MainTabs")) {
            navigation.navigate("MainTabs", { screen: tabName });
          } else {
            navigationUtils.navigateNested(["User", "MainTabs", tabName]);
          }
      }
    } catch (error) {
      console.warn(`Navigation failed: ${error.message}`);
      // If navigation fails, try to go back
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  const getActiveTab = () => {
    // Logic to determine which tab is active based on current route and context
    const currentRouteName = route.name;

    // Try to find a direct match
    const directMatch = tabItems.find((item) => item.navigateTo === currentRouteName);
    if (directMatch) return directMatch.navigateTo;

    // For nested routes, use some heuristics
    if (currentRouteName.includes("Book")) return navigatorContext === "user" ? "BooksTab" : "Books";
    if (currentRouteName.includes("Profile")) return "ProfileTab";
    if (currentRouteName.includes("User")) return "ManageUsers";
    if (currentRouteName.includes("System")) return "SystemMetrics";

    // Default to first tab
    return tabItems[0].navigateTo;
  };

  const activeTab = getActiveTab();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialIcons
          name="code"
          size={80}
          color="#3498db"
          style={styles.icon}
        />
        <Text style={styles.text}>{routeName || "This screen"} is under development</Text>
        <Text style={styles.subText}>Navigator context: {navigatorContext}</Text>
      </View>

      {/* Custom Bottom Tab Navigator */}
      <View style={styles.tabContainer}>
        {tabItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.tabItem}
            onPress={() => navigateToTab(item.navigateTo)}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={activeTab === item.navigateTo ? "#2c3e50" : "#95a5a6"}
            />
            <Text style={[styles.tabLabel, activeTab === item.navigateTo && styles.activeTabLabel]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60, // Space for tab bar
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#2c3e50",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
    paddingVertical: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    color: "#95a5a6",
  },
  activeTabLabel: {
    color: "#2c3e50",
    fontWeight: "bold",
  },
});

export default EmptyScreen;
