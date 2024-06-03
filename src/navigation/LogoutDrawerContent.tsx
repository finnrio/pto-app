import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Alert } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase/firebaseConfig";

export default function LogoutDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          signOut(FIREBASE_AUTH)
            .then(() => Alert.alert("Logged Out", "You are now logged out"))
            .catch((error) => {
              Alert.alert(error);
            });
        }}
      />
    </DrawerContentScrollView>
  );
}
