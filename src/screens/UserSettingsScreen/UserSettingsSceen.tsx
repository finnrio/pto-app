import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/UserContext";
import GetUserProfileData from "../../firebase/firestore/user/GetUserProfileData";
import SetUserProfileData from "../../firebase/firestore/user/SetUserProfileData";
import styles from "./styles";

export default function UserSettingsScreen() {
  const userID = useContext(UserContext)?.uid;
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  async function RenderUserData(id: any) {
    const res = await GetUserProfileData(id);
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

  useEffect(() => {
    RenderUserData(userID);
  }, []);

  function HandleUpdateBtn() {
    try {
      Alert.alert(
        "Update users profile details",
        "Are you sure you want to update your profile details?",
        [
          {
            text: "Update",
            onPress: () => {
              SetUserProfileData(createUserDataObject(), userID);
              RenderUserData(userID);
            },
            style: "default",
          },
          {
            text: "Cancel",
            onPress: () => RenderUserData(userID),
            style: "cancel",
          },
        ],
        { cancelable: true },
      );
    } catch (e) {
      console.error(e);
      Alert.alert(e);
    }
  }

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
          value={userID}
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
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="User Role"
          placeholderTextColor="#aaaaaa"
          value={role}
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
