import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserProfilePage from "./screens/UserProfilePage";
import { CurrentUserContext } from "./contexts/userContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUid, setCurrentUid] = useState("");

  return (
    <CurrentUserContext.Provider value={{ currentUid, setCurrentUid }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUpScreen"
            component={SignUpScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="UserProfilePage" component={UserProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrentUserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
