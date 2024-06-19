import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import AddUser from "../../firebase/operations/AddUser";
import GetUserData from "../../firebase/operations/GetUserData";
import GetAllManagers from "../../firebase/operations/GetAllManagers";
import { UserContext } from "../../context/UserContext";

export default function RegistrationScreen() {
  const currentUser = useContext(UserContext);
  const [formComplete, setFormComplete] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState<any[]>([]);
  const [openManager, setOpenManager] = useState(false);

  function ResetForm() {
    setFirstName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setRole("");
    setManager("");
  }

  async function HandleAddUserBtn() {
    if ((await GetUserData(currentUser!.uid)).role === "Administrator") {
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
          testID="email_input"
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
          testID="password_input"
        />
        <Text style={styles.text}>Role</Text>
        <SegmentedButtons
          value={role}
          onValueChange={setRole}
          buttons={[
            {
              value: "User",
              label: "User",
              testID: "user_button",
            },
            {
              value: "Manager",
              label: "Manager",
              testID: "manager_button",
            },
          ]}
        />
        <Text style={styles.text}>Manager</Text>
        <DropDownPicker
          open={openManager}
          value={manager}
          items={managerList}
          setOpen={setOpenManager}
          setValue={setManager}
          setItems={setManagerList}
          searchable={true}
          testID="manager_dropdown"
        />
        <TouchableOpacity
          style={formComplete ? styles.button : styles.buttonUnavailable}
          onPress={() =>
            formComplete
              ? HandleAddUserBtn()
              : Alert.alert(
                  "Error",
                  "Please complete the form before submitting.",
                )
          }
          testID="add_user_button"
        >
          <Text style={styles.buttonTitle}>Add to System</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => ResetForm()}
          testID="reset_button"
        >
          <Text style={styles.buttonTitle}>Reset Form</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
