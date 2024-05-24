import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { User } from "firebase/auth";
import { decode, encode } from "base-64";
import { LoginScreen } from "./src/screens";
import { FIREBASE_AUTH } from "./src/firebase/firebaseConfig";
import EmployeeDrawerNavigator from "./src/navigators/EmployeeDrawerNavigator";
import { UserContext } from "./src/context/UserContext";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function onAuthStateChanged(user: User | null) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = FIREBASE_AUTH.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={user}>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={EmployeeDrawerNavigator}
            />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
