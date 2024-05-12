import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { CalendarScreen, EmployeeActivityScreen } from "../screens";
import LogoutDrawerContent from "./LogoutDrawerContent";

export default function EmployeeDrawerNavigator(appProps: any) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <LogoutDrawerContent {...props} />}
    >
      <Drawer.Screen name="Activity">
        {(props) => (
          <EmployeeActivityScreen {...props} extraData={appProps.extraData} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Calendar">
        {(props) => (
          <CalendarScreen {...props} extraData={appProps.extraData} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
