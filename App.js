import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserProfilePage from "./screens/UserProfilePage";
import AddNewBookScreen from "./screens/AddNewBookScreen";
import BarcodeScanner from "./components/Barcode-scanner";
import { CurrentUserContext } from "./contexts/userContext";
import { CurrentCatalogueContext } from "./contexts/catalogueContext";
import NewCatalogueScreen from "./screens/NewCatalogueScreen";
import SingleCatalogueScreen from "./screens/SingleCatalogueScreen";
import SingleBookScreen from "./screens/SingleBookScreen";
import ManualSearch from "./components/ManualSearch";
import PublicUsersScreen from "./screens/PublicUsersScreen";
import PublicProfileScreen from "./screens/PublicProfileScreen";
import FriendsListScreen from "./screens/FriendsListScreen";
import ChatScreen from "./screens/ChatScreen";
import { LogBox } from "react-native";

//Ignore log notification by message:
LogBox.ignoreLogs(["new NativeEventEmitter"]);

// Ignore all log notifications:
// LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUid, setCurrentUid] = useState("");
  const [currentCatalogue, setCurrentCatalogue] = useState("");

  return (
    <CurrentUserContext.Provider value={{ currentUid, setCurrentUid }}>
      <CurrentCatalogueContext.Provider
        value={{ currentCatalogue, setCurrentCatalogue }}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{contentStyle: {backgroundColor: '#42273B'}}}>
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
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PublicUsersScreen"
              component={PublicUsersScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PublicProfile"
              component={PublicProfileScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="UserProfilePage"
              component={UserProfilePage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="NewCatalogueScreen"
              component={NewCatalogueScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SingleCatalogueScreen"
              component={SingleCatalogueScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SingleBookScreen"
              component={SingleBookScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ManualSearch"
              component={ManualSearch}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AddNewBookScreen"
              component={AddNewBookScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Scanner"
              component={BarcodeScanner}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="FriendsList"
              component={FriendsListScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ChatScreen"
              component={ChatScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentCatalogueContext.Provider>
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
