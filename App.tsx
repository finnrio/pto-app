import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CalendarScreen, EmployeeActivityScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { PaperProvider } from 'react-native-paper';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {

  const Drawer = createDrawerNavigator();
  return (
    <PaperProvider>
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
            <Drawer.Screen name="Activity" component={EmployeeActivityScreen} />
            <Drawer.Screen name="Calendar" component={CalendarScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}