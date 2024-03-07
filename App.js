import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BtnGoBack from "./components/BtnGoBack";
import HomeScreen from "./containers/HomeScreen";
import SigninScreen from "./containers/SigninScreen";
import SignupScreen from "./containers/SignupScreen";
import RoomScreen from "./containers/RoomScreen";
import ProfilScreen from "./containers/ProfilScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setToken = async (token, id) => {
    if (token && id) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
      console.log("id>>>", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }
    setUserToken(token);
    setUserId(id);
  };

  const removeToken = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      setUserToken(userToken);
      setUserId(userId);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    return null;
  }
  return (
    <NavigationContainer>
      {userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen name="Signin">
            {(props) => <SigninScreen setToken={setToken} {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {(props) => <SignupScreen setToken={setToken} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="homeTab"
            options={{
              headerShown: false,
              title: "Home",
              tabBarIcon: () => {
                return <FontAwesome name="home" size={24} color="black" />;
              },
            }}
          >
            {() => (
              <Stack.Navigator>
                {/* -- Premier écran de l'onglet 1 ------ */}
                <Stack.Screen
                  name="home"
                  component={HomeScreen}
                  options={{
                    // Personnalisation du bouton goBack
                    headerShown: false,
                    headerLeft: ({ canGoBack }) => {
                      return canGoBack ? <BtnGoBack /> : null;
                    },
                  }}
                />

                {/* -- Deuxième écran de l'onglet 1 ------ */}
                <Stack.Screen
                  name="room"
                  component={RoomScreen}
                  options={{
                    headerShown: false,
                    headerLeft: () => <BtnGoBack />,
                  }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="AroundMe"
            options={{
              headerShown: false,
              title: "Around Me",
              tabBarIcon: () => {
                return (
                  <MaterialIcons name="where-to-vote" size={24} color="black" />
                );
              },
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Aroundme"
                  component={AroundMeScreen}
                  options={{
                    headerShown: false,
                    title: "Around Me",
                    headerLeft: () => <BtnGoBack />,
                  }}
                />
                <Stack.Screen
                  name="room1"
                  component={RoomScreen}
                  options={{
                    headerShown: false,
                    headerLeft: () => <BtnGoBack />,
                  }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="profilTab"
            options={{
              title: "Profil",
              headerShown: false,
              tabBarIcon: () => {
                return <Ionicons name="person" size={24} color="black" />;
              },
            }}
          >
            {() => (
              <Stack.Navigator>
                {/* -- Premier écran de l'onglet 1 ------ */}
                <Stack.Screen name="profil">
                  {(props) => (
                    <ProfilScreen
                      token={userToken}
                      id={userId}
                      removeToken={removeToken}
                      {...props}
                    />
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
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
