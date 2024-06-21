import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext, useEffect, useState } from "react";
import {
  AdminDashboardScreen,
  AdminUserProfileScreen,
  CalendarScreen,
  UserActivityScreen,
  ManagerActivityScreen,
  ManagerDashboardScreen,
  PTORequestFormScreen,
  RegistrationScreen,
  UserDashboardScreen,
  UserProfileScreen,
} from "../screens";
import LogoutDrawerContent from "./LogoutDrawerContent";
import GetUserData from "../firebase/operations/GetUserData";
import { UserContext } from "../context/UserContext";

export default function AppDrawerNavigator() {
  const currentUser = useContext(UserContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    GetUserData(currentUser!.uid).then((data) => {
      setRole(data.role);
    });
  }, []);

  const Drawer = createDrawerNavigator();

  switch (role) {
    case "Administrator":
      return (
        <Drawer.Navigator
          drawerContent={(props) => <LogoutDrawerContent {...props} />}
          detachInactiveScreens={true}
        >
          <Drawer.Screen name="Dashboard" component={AdminDashboardScreen} />
          <Drawer.Screen
            name="Register a User"
            component={RegistrationScreen}
          />
          <Drawer.Screen
            name="Admin User Management"
            component={AdminUserProfileScreen}
          />
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
        </Drawer.Navigator>
      );
    case "Manager":
      return (
        <Drawer.Navigator
          drawerContent={(props) => <LogoutDrawerContent {...props} />}
          detachInactiveScreens={true}
        >
          <Drawer.Screen name="Dashboard" component={ManagerDashboardScreen} />
          <Drawer.Screen name="My Activity" component={UserActivityScreen} />
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
          <Drawer.Screen name="Dashboard" component={UserDashboardScreen} />
          <Drawer.Screen name="My Activity" component={UserActivityScreen} />
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
