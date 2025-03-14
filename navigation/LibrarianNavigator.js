import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// Import librarian screens
import LibrarianDashboardScreen from "../screens/librarian/LibrarianDashboardScreen";
import ManageBooksScreen from "../screens/librarian/ManageBooksScreen";
import BookEntryScreen from "../screens/librarian/BookEntryScreen";
import BarcodeScannerScreen from "../screens/librarian/BarcodeScannerScreen";
import CirculationScreen from "../screens/librarian/CirculationScreen";
import ReservationsScreen from "../screens/librarian/ReservationsScreen";
import ReportScreen from "../screens/librarian/ReportScreen";
import MembersScreen from "../screens/librarian/MembersScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs for librarian main sections
const LibrarianTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Dashboard":
              iconName = "dashboard";
              break;
            case "Books":
              iconName = "library-books";
              break;
            case "Circulation":
              iconName = "swap-horiz";
              break;
            case "Members":
              iconName = "people";
              break;
            case "Reports":
              iconName = "analytics";
              break;
            default:
              iconName = "help";
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
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={LibrarianDashboardScreen}
      />
      <Tab.Screen
        name="Books"
        component={BooksNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Circulation"
        component={CirculationScreen}
      />
      <Tab.Screen
        name="Members"
        component={MembersScreen}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
      />
    </Tab.Navigator>
  );
};

// Stack navigator for book management
const BooksNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManageBooks"
        component={ManageBooksScreen}
        options={{ title: "Manage Books" }}
      />
      <Stack.Screen
        name="BookEntry"
        component={BookEntryScreen}
        options={({ route }) => ({
          title: route.params?.editing ? "Edit Book" : "Add New Book",
        })}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
        options={{ title: "Scan Book" }}
      />
    </Stack.Navigator>
  );
};

// Main librarian navigator
const LibrarianNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LibrarianTabs"
        component={LibrarianTabNavigator}
      />
      <Stack.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{ headerShown: true, title: "Reservations" }}
      />
    </Stack.Navigator>
  );
};

export default LibrarianNavigator;
