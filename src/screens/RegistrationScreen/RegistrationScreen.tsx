import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./styles";
import AddUser from "../../firebase/firestore/AddUser";
import GetCurrentUserData from "../../firebase/firestore/GetCurrentUserData";
import GetAllManagers from "../../firebase/firestore/GetAllManagers";

export default function RegistrationScreen() {
  const [formComplete, setFormComplete] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState<any[]>([]);

  function ResetForm() {
    setFirstName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setRole("");
    setManager("");
  }

  async function HandleAddUserBtn() {
    if ((await GetCurrentUserData()).role === "Administrator") {
      AddUser(
        {
          first_name: firstName,
          surname,
          email,
          role,
          manager_id: manager,
        },
        password,
      )
        .then(() => {
          Alert.alert(
            "Success",
            "A new user has been successfully added to the system.",
          );
          ResetForm();
        })
        .catch((error) => Alert.alert(error.code, error.message));
    } else {
      Alert.alert("Permissions", "You do not have permissions for this action");
    }
  }

  useEffect(() => {
    if (!formComplete) {
      GetAllManagers()
        .then((response) => setManagerList(response))
        .catch((e) => Alert.alert(e.code, e.message));
    }
  }, [formComplete]);

  // ensure form is complete before attempting to create and add a new user to the system
  useEffect(() => {
    if ((firstName && surname && email && role && password) !== "") {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [firstName, surname, email, role, password, manager]);

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
          ]}
        />
        <Text style={styles.text}>Manager</Text>
        <SelectList
          setSelected={setManager}
          data={managerList}
          save="key"
          defaultOption={
            manager
              ? managerList.find((man) => man.key === manager)
              : { key: "", value: "" }
          }
        />
        <TouchableOpacity
          style={formComplete ? styles.button : styles.buttonUnavailable}
          onPress={() =>
            formComplete ? HandleAddUserBtn() : Alert.alert("Incomplete Form")
          }
        >
          <Text style={styles.buttonTitle}>Add to System</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ResetForm()}>
          <Text style={styles.buttonTitle}>Reset Form</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
