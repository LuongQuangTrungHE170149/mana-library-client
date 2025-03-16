import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { safeScreen, importScreen } from "../utils/screenUtils";

const AuthStack = createStackNavigator();
// Use placeholders for screens
// const LoginScreen = importScreen("../screens/auth/LoginScreen", "Login");
import LoginScreen from "../screens/auth/LoginScreen";
const RegisterScreen = importScreen("../screens/auth/RegisterScreen", "Register");
const ForgotPasswordScreen = importScreen("../screens/auth/ForgotPasswordScreen", "Forgot Password");
const VerifyCodeScreen = importScreen("../screens/auth/VerifyCodeScreen", "Verify Code");

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: true }}>
      <AuthStack.Screen
        name="Login"
        component={safeScreen(LoginScreen, "Login")}
      />
      {/* <AuthStack.Screen
        name="Register"
        component={safeScreen(RegisterScreen, "Register")}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={safeScreen(ForgotPasswordScreen, "Forgot Password")}
      />
      <AuthStack.Screen
        name="VerifyCode"
        component={safeScreen(VerifyCodeScreen, "Verify Code")}
      /> */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
