import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import DarkTheme from "./theme/DarkTheme";

// Auth and Navigation
import AuthNavigator from "./navigation/AuthNavigator";
import UserNavigator from "./navigation/UserNavigator";
import AdminNavigator from "./navigation/AdminNavigator";
import LibrarianNavigator from "./navigation/LibrarianNavigator";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/auth/LoginScreen";
// Contexts
import { AuthProvider, useAuth } from "./context/AuthContext";

//Test component
import BookListScreen from "./screens/user/BookListScreen";



const Stack = createStackNavigator();

const Navigation = () => {
  const { userToken, userRole } = useAuth();

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
            />
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
            />
            <Stack.Screen
              name="User"
              component={UserNavigator}
            />
          </>
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
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
