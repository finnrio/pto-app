import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import {
  AdminUserProfileScreen,
  CalendarScreen,
  EmployeeActivityScreen,
  RegistrationScreen,
  UserProfileScreen,
} from "../screens";
import LogoutDrawerContent from "./LogoutDrawerContent";
import GetCurrentUserData from "../firebase/firestore/GetCurrentUserData";

export default function AppDrawerNavigator() {
  const [role, setRole] = useState("");

  useEffect(() => {
    GetCurrentUserData().then((data) => setRole(data.role));
  }, []);

  const Drawer = createDrawerNavigator();

  switch (role) {
    case "Administrator":
      return (
        <Drawer.Navigator
          drawerContent={(props) => <LogoutDrawerContent {...props} />}
          detachInactiveScreens={true}
        >
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
          <Drawer.Screen
            name="Register a User"
            component={RegistrationScreen}
          />
          <Drawer.Screen
            name="Admin User Management"
            component={AdminUserProfileScreen}
          />
        </Drawer.Navigator>
      );
    case "Manager":
      return (
        <Drawer.Navigator
          drawerContent={(props) => <LogoutDrawerContent {...props} />}
          detachInactiveScreens={true}
        >
          <Drawer.Screen name="Activity" component={EmployeeActivityScreen} />{" "}
          // TODO manager versions that have subordinate inforamtion
          <Drawer.Screen name="Calendar" component={CalendarScreen} />
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
        </Drawer.Navigator>
      );
    case "User":
      return (
        <Drawer.Navigator
          drawerContent={(props) => <LogoutDrawerContent {...props} />}
          detachInactiveScreens={true}
        >
          <Drawer.Screen name="Activity" component={EmployeeActivityScreen} />
          <Drawer.Screen name="Calendar" component={CalendarScreen} />
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
        </Drawer.Navigator>
      );
    default: {
      break;
    }
  }
}
