import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { User, signOut } from "firebase/auth";
import { decode, encode } from "base-64";
import { UserContext } from "./src/context/UserContext";
import { LoginScreen } from "./src/screens";
import { FIREBASE_AUTH } from "./src/firebase/firebaseConfig";
import VerifyUser from "./src/firebase/operations/VerifyUser";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [verified, setVerified] = useState(false);

  async function verifyUser() {
    if (user != null && !(await VerifyUser(user.uid))) {
      setVerified(false);
      signOut(FIREBASE_AUTH);
      console.error("This user does not exist in the database");
      Alert.alert(
        "Contact system administrators",
        "This user account is not configured",
      );
    } else {
      setVerified(true);
    }
  }

  useEffect(() => {
    if (user) {
      verifyUser();
    }
  }, [user]);

  function onAuthStateChanged(newUser: User | null) {
    setUser(newUser);
    if (!newUser) {
      setVerified(false);
    }
  }

  useEffect(() => {
    const subscriber = FIREBASE_AUTH.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={user}>
        <Stack.Navigator>
          {user && verified ? (
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={AppDrawerNavigator}
            />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
