import { DefaultTheme } from "@react-navigation/native";

export default {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    background: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    border: "#272729",
    notification: "#ff453a",
  },
};
