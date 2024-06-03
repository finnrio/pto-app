import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Alert } from "react-native";
import { FIREBASE_AUTH } from "../firebase/firebaseConfig";

export default function LogoutDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          FIREBASE_AUTH.signOut()
            .then(() =>
              Alert.alert(
                "Logged Out",
                "You are now logged out",
                // [
                //   {
                //     text: "Return to login page",
                //     onPress: () => props.navigation.navigate("Login"),
                //   },
                // ]
              ),
            )
            .catch((error) => {
              alert(error);
            });
        }}
      />
    </DrawerContentScrollView>
  );
}
