<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
=======
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { User } from "firebase/auth";
import { decode, encode } from "base-64";
import { UserContext } from "./src/context/UserContext";
import { LoginScreen } from "./src/screens";
import { FIREBASE_AUTH } from "./src/firebase/firebaseConfig";
import EmployeeDrawerNavigator from "./src/navigators/EmployeeDrawerNavigator";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
>>>>>>> 591a59a591e38081932864d3688548cbb43dc9ae

export default function App() {
  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
=======
    <NavigationContainer>
      <UserContext.Provider value={user}>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <EmployeeDrawerNavigator {...props} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
>>>>>>> 591a59a591e38081932864d3688548cbb43dc9ae
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
