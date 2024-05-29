import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { updateEmail } from "firebase/auth";

import { UserContext } from "../../context/UserContext";
import GetCurrentUserData from "../../firebase/firestore/GetCurrentUserData";
import SetUserProfileData from "../../firebase/firestore/SetUserProfileData";
import styles from "./styles";
import { FIREBASE_AUTH } from "../../firebase/firebaseConfig";
import { AppUser } from "../../types/AppUser";

export default function UserProfileScreen() {
  const currentUser = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  async function RenderUserData(/* id: any */) {
    const res: AppUser = await GetCurrentUserData(); // this should use an ID if used by admin
    setFirstName(res?.first_name);
    setSurname(res?.surname);
    setEmail(res?.email);
    setRole(res?.role);
  }

  function createUserDataObject() {
    return {
      first_name: firstName,
      surname,
      email,
    };
  }

  function HandleUpdateBtn() {
    try {
      Alert.alert(
        "Update users profile details",
        "Are you sure you want to update your profile details?",
        [
          {
            text: "Update",
            onPress: () => {
              SetUserProfileData(createUserDataObject(), currentUser?.uid);
              if (email !== FIREBASE_AUTH.currentUser?.email) {
                updateEmail(currentUser!, email!).catch((error) =>
                  Alert.alert("Error", error.code),
                );
              }
              RenderUserData();
            },
            style: "default",
          },
          {
            text: "Reset Changes",
            onPress: () => RenderUserData(),
            style: "cancel",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true },
      );
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        Alert.alert(e.name, e.message);
      } else {
        Alert.alert("Error", "An error has occured");
      }
    }
  }

  useEffect(() => {
    RenderUserData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.text}>User ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Failed to load User ID"
          placeholderTextColor="#aaaaaa"
          value={currentUser?.uid}
          underlineColorAndroid="transparent"
          editable={false}
        />
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setFirstName(text);
          }}
          value={firstName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Surname"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setSurname(text);
          }}
          value={surname}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email!}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="User Role"
          placeholderTextColor="#aaaaaa"
          value={role?.toString()}
          underlineColorAndroid="transparent"
          editable={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            HandleUpdateBtn();
          }}
        >
          <Text style={styles.buttonTitle}>Update Profile</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
