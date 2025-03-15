import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { safeScreen, importScreen } from "../utils/screenUtils";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Use placeholders for screens that can't be resolved
const LibrarianDashboardScreen = importScreen("../screens/librarian/LibrarianDashboardScreen", "Librarian Dashboard");
const ManageBooksScreen = importScreen("../screens/librarian/ManageBooksScreen", "Manage Books");
const BookEntryScreen = importScreen("../screens/librarian/BookEntryScreen", "Book Entry");
const BarcodeScannerScreen = importScreen("../screens/librarian/BarcodeScannerScreen", "Barcode Scanner");
const CirculationScreen = importScreen("../screens/librarian/CirculationScreen", "Circulation");
const ReservationsScreen = importScreen("../screens/librarian/ReservationsScreen", "Reservations");
const ReportScreen = importScreen("../screens/librarian/ReportScreen", "Report");
const MembersScreen = importScreen("../screens/librarian/MembersScreen", "Members");

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
        component={safeScreen(LibrarianDashboardScreen, "Librarian Dashboard")}
      />
      <Tab.Screen
        name="Books"
        component={BooksNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Circulation"
        component={safeScreen(CirculationScreen, "Circulation")}
      />
      <Tab.Screen
        name="Members"
        component={safeScreen(MembersScreen, "Members")}
      />
      <Tab.Screen
        name="Reports"
        component={safeScreen(ReportScreen, "Reports")}
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
        component={safeScreen(ManageBooksScreen, "Manage Books")}
        options={{ title: "Manage Books" }}
      />
      <Stack.Screen
        name="BookEntry"
        component={safeScreen(BookEntryScreen, "Book Entry")}
        options={({ route }) => ({
          title: route.params?.editing ? "Edit Book" : "Add New Book",
        })}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={safeScreen(BarcodeScannerScreen, "Barcode Scanner")}
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
        component={safeScreen(ReservationsScreen, "Reservations")}
        options={{ headerShown: true, title: "Reservations" }}
      />
    </Stack.Navigator>
  );
};

export default LibrarianNavigator;
