import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { safeScreen, importScreen } from "../utils/screenUtils";

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const BooksStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// Use placeholders for screens that can't be resolved
const HomeScreen = importScreen("../screens/user/HomeScreen", "Home");
const BooksListScreen = importScreen("../screens/user/BooksListScreen", "Books List");
const BookDetailScreen = importScreen("../screens/user/BookDetailScreen", "Book Details");
const ProfileScreen = importScreen("../screens/user/ProfileScreen", "Profile");
const HistoryScreen = importScreen("../screens/user/HistoryScreen", "History");
const SettingsScreen = importScreen("../screens/user/SettingsScreen", "Settings");

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={safeScreen(HomeScreen, "Home")}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const BooksStackScreen = () => (
  <BooksStack.Navigator>
    <BooksStack.Screen
      name="BooksList"
      component={safeScreen(BooksListScreen, "Books List")}
      options={{ title: "Books" }}
    />
    <BooksStack.Screen
      name="BookDetail"
      component={safeScreen(BookDetailScreen, "Book Details")}
      options={{ title: "Book Details" }}
    />
  </BooksStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={safeScreen(ProfileScreen, "Profile")}
      options={{ headerShown: false }}
    />
  </ProfileStack.Navigator>
);

const HistoryStackScreen = () => (
  <HistoryStack.Navigator>
    <HistoryStack.Screen
      name="History"
      component={safeScreen(HistoryScreen, "History")}
      options={{ headerShown: false }}
    />
  </HistoryStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Settings"
      component={safeScreen(SettingsScreen, "Settings")}
      options={{ headerShown: false }}
    />
  </SettingsStack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "BooksTab") {
            iconName = "library-books";
          } else if (route.name === "ProfileTab") {
            iconName = "person";
          } else if (route.name === "HistoryTab") {
            iconName = "history";
          } else if (route.name === "SettingsTab") {
            iconName = "settings";
          }

          return (
            <MaterialIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#2c3e50",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="BooksTab"
        component={BooksStackScreen}
        options={{ tabBarLabel: "Books" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{ tabBarLabel: "Profile" }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStackScreen}
        options={{ tabBarLabel: "History" }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackScreen}
        options={{ tabBarLabel: "Settings" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
