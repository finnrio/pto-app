import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/UserContext";
import GetUserData from "../../firebase/operations/GetUserData";
import UpdateUserData from "../../firebase/operations/UpdateUserData";
import styles from "./styles";
import { AppUser } from "../../types/AppUser";

export default function UserProfileScreen() {
  const currentUser = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [ptoAvailable, setPtoAvailable] = useState(0);

  async function RenderUserData() {
    await GetUserData(currentUser!.uid).then((res: AppUser) => {
      setFirstName(res.first_name);
      setSurname(res.surname);
      setEmail(res.email);
      setRole(res.role);
      setPtoAvailable(res.pto_allowance - res.pto_used - res.pto_pending);
    });
  }

  function createUserDataObject() {
    return {
      first_name: firstName,
      surname,
      email,
      role,
    };
  }

  function HandleUpdateBtn() {
    Alert.alert(
      "Update users profile details",
      "Are you sure you want to update your profile details?",
      [
        {
          text: "Update",
          onPress: () => {
            UpdateUserData(createUserDataObject(), currentUser?.uid);
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
          testID="user_id_input"
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
          testID="firstName_input"
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
          testID="surname_input"
        />
        <TouchableOpacity
          onPress={() => Alert.alert("Email cannot be updated", "Contact an administrator to update your email")}
          testID="email_touchable"
          >
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            value={email!}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            testID="email_input"
            editable={false}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="User Role"
          placeholderTextColor="#aaaaaa"
          value={role?.toString()}
          underlineColorAndroid="transparent"
          editable={false}
          testID="role_input"
        />
        <Text style={styles.text}>PTO Available</Text>
        <TextInput
          style={styles.input}
          placeholder="PTO Available"
          placeholderTextColor="#aaaaaa"
          value={ptoAvailable?.toString()}
          underlineColorAndroid="transparent"
          editable={false}
          testID="ptoAvailable_input"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            HandleUpdateBtn();
          }}
          testID="update_btn"
        >
          <Text style={styles.buttonTitle}>Update Profile</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
