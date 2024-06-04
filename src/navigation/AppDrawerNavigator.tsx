import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import {
  AdminUserProfileScreen,
  CalendarScreen,
  EmployeeActivityScreen,
  PTORequestFormScreen,
  RegistrationScreen,
  UserProfileScreen,
} from "../screens";
import LogoutDrawerContent from "./LogoutDrawerContent";
import GetCurrentUserData from "../firebase/firestore/GetCurrentUserData";
import ManagerActivityScreen from "../screens/ManagerActivityScreen/ManagerActivityScreen";

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
          <Drawer.Screen
            name="PTO Activity"
            component={EmployeeActivityScreen}
          />
          <Drawer.Screen
            name="Team Activity"
            component={ManagerActivityScreen}
          />
          <Drawer.Screen name="Calendar" component={CalendarScreen} />
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
          <Drawer.Screen
            name="PTO Request Form"
            component={PTORequestFormScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
        </Drawer.Navigator>
      );
    case "User":
      return (
        <Drawer.Navigator
          drawerContent={(props) => <LogoutDrawerContent {...props} />}
          detachInactiveScreens={true}
        >
          <Drawer.Screen
            name="PTO Activity"
            component={EmployeeActivityScreen}
          />
          <Drawer.Screen name="Calendar" component={CalendarScreen} />
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
          <Drawer.Screen
            name="PTO Request Form"
            component={PTORequestFormScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
        </Drawer.Navigator>
      );
    default: {
      break;
    }
  }
}
