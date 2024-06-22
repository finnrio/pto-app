import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

import UpdateUserData from "../../firebase/operations/UpdateUserData";
import styles from "./styles";
import { AppUser } from "../../types/AppUser";
import GetAllManagers from "../../firebase/operations/GetAllManagers";
import GetAllUsers from "../../firebase/operations/GetAllUsers";
import DeleteUser from "../../firebase/operations/DeleteUser";
import GetUserData from "../../firebase/operations/GetUserData";

export default function AdminUserProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [ptoUsed, setPTOUsed] = useState("");
  const [ptoAllowance, setPTOAllowance] = useState("");
  const [allUserList, setAllUserList] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  async function RenderUserData(id: string) {
    const res: AppUser = await GetUserData(id);
    setFirstName(res?.first_name);
    setSurname(res?.surname);
    setEmail(res?.email);
    setRole(res?.role);
    setManager(res?.manager_id ? res.manager_id : "");
    setPTOUsed(res?.pto_used);
    setPTOAllowance(res?.pto_allowance);
  }

  async function RenderUserLists() {
    await GetAllUsers()
      .then((response) => setUserList(response))
      .catch((e) => Alert.alert(e.code, e.message));
    await GetAllManagers()
      .then((response) => setManagerList(response))
      .catch((e) => Alert.alert(e.code, e.message));
  }

  function createUserDataObject() {
    return {
      first_name: firstName,
      surname,
      role,
      manager_id: manager,
      pto_allowance: ptoAllowance,
      pto_used: ptoUsed,
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
              UpdateUserData(createUserDataObject(), selectedUser);
              RenderUserData("");
            },
            style: "default",
          },
          {
            text: "Reset Changes",
            onPress: () => {
              RenderUserData(selectedUser);
              RenderUserLists();
            },
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

  function HandleRemoveUserBtn() {
    Alert.alert(
      "Warning",
      `Are you sure you want to delete ${firstName} ${surname} from the system?`,
      [
        {
          text: "Delete",
          onPress: () => {
            DeleteUser(selectedUser);
            setSelectedUser("");
            RenderUserData(selectedUser);
          },
          style: "default",
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
    RenderUserLists();
  }, []);

  useEffect(() => {
    setAllUserList(userList.concat(managerList));
  }, [userList, managerList]);

  useEffect(() => {
    if (selectedUser) RenderUserData(selectedUser);
    RenderUserLists();
  }, [selectedUser]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        scrollEnabled={scrollEnabled}
      >
        <DropDownPicker
          open={openUser}
          value={selectedUser}
          items={allUserList}
          setOpen={setOpenUser}
          setValue={setSelectedUser}
          setItems={setAllUserList}
          onOpen={() => setScrollEnabled(false)}
          onClose={() => setScrollEnabled(true)}
          searchable={true}
          testID="user_dropdown"
        />
        <Text style={styles.text}>User ID</Text>
        <TextInput
          style={styles.input}
          placeholder="No user selected"
          placeholderTextColor="#aaaaaa"
          value={selectedUser}
          underlineColorAndroid="transparent"
          editable={false}
          testID="uid_input"
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
          editable={!!selectedUser}
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
          editable={!!selectedUser}
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
          value={email!}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          editable={false}
          testID="email_input"
        />
        <Text style={styles.text}>Role</Text>
        <SegmentedButtons
          value={role}
          onValueChange={setRole}
          buttons={[
            {
              value: "User",
              label: "User",
              disabled: !selectedUser,
              testID: "user_button",
            },
            {
              value: "Manager",
              label: "Manager",
              disabled: !selectedUser,
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
          onOpen={() => setScrollEnabled(false)}
          onClose={() => setScrollEnabled(true)}
          searchable={true}
          testID="manager_dropdown"
        />
        <Text style={styles.text}>PTO Allowance</Text>
        <TextInput
          style={styles.input}
          placeholder="PTO Allowance"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setPTOAllowance(text);
          }}
          value={ptoAllowance?.toString()}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          editable={!!selectedUser}
          testID="pto_allowance_input"
        />
        <Text style={styles.text}>PTO Used</Text>
        <TextInput
          style={styles.input}
          placeholder="PTO Used"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setPTOUsed(text);
          }}
          value={ptoUsed?.toString()}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          editable={!!selectedUser}
          testID="pto_used_input"
        />
        <TouchableOpacity
          style={selectedUser ? styles.button : styles.buttonUnavailable}
          onPress={() =>
            selectedUser ? HandleUpdateBtn() : Alert.alert("No user selected")
          }
          testID="update_button"
        >
          <Text style={styles.buttonTitle}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedUser ? styles.button : styles.buttonUnavailable}
          onPress={() =>
            selectedUser
              ? HandleRemoveUserBtn()
              : Alert.alert("No user selected")
          }
          testID="remove_button"
        >
          <Text style={styles.buttonTitle}>Remove User</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
