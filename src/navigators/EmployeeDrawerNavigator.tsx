import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import {
  CalendarScreen,
  EmployeeActivityScreen,
  UserProfileScreen,
} from "../screens";
import LogoutDrawerContent from "./LogoutDrawerContent";

export default function EmployeeDrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <LogoutDrawerContent {...props} />}
    >
      <Drawer.Screen name="Activity" component={EmployeeActivityScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Settings" component={UserProfileScreen} />
    </Drawer.Navigator>
  );
}
