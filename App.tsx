import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { User } from "firebase/auth"
import { LoginScreen, HomeScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { FIREBASE_AUTH } from './src/firebase/firebaseConfig';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  function onAuthStateChanged(user: User | null) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = FIREBASE_AUTH.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}