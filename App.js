import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Auth and Navigation
import AuthNavigator from "./navigation/AuthNavigator";
import UserNavigator from "./navigation/UserNavigator";
import AdminNavigator from "./navigation/AdminNavigator";
import LibrarianNavigator from "./navigation/LibrarianNavigator";

// Contexts
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LibrarianProvider } from "./context/LibrarianContext";

const Stack = createStackNavigator();

const Navigation = () => {
  const { userToken, userRole } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
          />
        ) : userRole === "admin" ? (
          <Stack.Screen
            name="Admin"
            component={AdminNavigator}
          />
        ) : userRole === "librarian" ? (
          <Stack.Screen
            name="Librarian"
            component={LibrarianNavigator}
          />
        ) : (
          <Stack.Screen
            name="User"
            component={UserNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AuthProvider>
        <LibrarianProvider>
          <Navigation />
        </LibrarianProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
