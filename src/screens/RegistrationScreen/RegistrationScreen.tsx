import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import styles from "./styles";
import AddUser from "../../firebase/firestore/AddUser";

export default function RegistrationScreen() {
  const [formComplete, setFormComplete] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  function HandleAddUserBtn() {
    AddUser(
      {
        first_name: firstName,
        surname,
        email,
        role,
      },
      password,
    )
      .then(() =>
        Alert.alert(
          "Success",
          "A new user has been successfully added to the system.",
        ),
      )
      .catch((error) => Alert.alert("Error", error.code));
  }

  // ensure form is complete before attempting to create and add a new user to the system
  useEffect(() => {
    if ((firstName && surname && email && role && password) !== "") {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [firstName, surname, email, role, password]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
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
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Role</Text>
        <SegmentedButtons
          value={role}
          onValueChange={setRole}
          buttons={[
            {
              value: "User",
              label: "User",
            },
            {
              value: "Manager",
              label: "Manager",
            },
            {
              value: "Administrator",
              label: "Administrator",
            },
          ]}
        />
        <TouchableOpacity
          style={formComplete ? styles.button : styles.buttonUnavailable}
          onPress={() =>
            formComplete ? HandleAddUserBtn() : Alert.alert("Incomplete Form")
          }
        >
          <Text style={styles.buttonTitle}>Add to System</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
