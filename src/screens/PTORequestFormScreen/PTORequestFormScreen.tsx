import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import CreatePTORequest from "../../firebase/firestore/CreatePTORequest";

export default function PTORequestFormScreen({ route, navigation }: any) {
  const [purpose, setPurpose] = useState("");

  function HandleCreatePTORequest() {
    CreatePTORequest(
      new Date(route.params.startDate),
      new Date(route.params.endDate),
      purpose,
      route.params.managerId,
    );
    Alert.alert(
      "PTO request submitted",
      "Your PTO request has been sent to you manager for review",
    );
    navigation.navigate("Calendar");
  }

  const HandleSubmitBtn = () => {
    if (purpose === "") {
      Alert.alert(
        "Purpose is required",
        "Please enter a purpose for your PTO request",
      );
    } else {
      HandleCreatePTORequest();
    }
  };

  const HandleCancelBtn = () => {
    Alert.alert("PTO request cancelled", "Your request has been cancelled");
    navigation.navigate("Calendar");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.text}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Start Date of PTO Request"
          placeholderTextColor="#aaaaaa"
          value={route.params.startDate}
          underlineColorAndroid="transparent"
          editable={false}
          testID="startDate_input"
        />
        <Text style={styles.text}>End Date</Text>
        <TextInput
          style={styles.input}
          placeholder="End Date of PTO Request"
          placeholderTextColor="#aaaaaa"
          value={route.params.endDate}
          underlineColorAndroid="transparent"
          editable={false}
          testID="endDate_input"
        />
        <Text style={styles.text}>Purpose</Text>
        <TextInput
          style={styles.input}
          placeholder="Purpose of PTO Request"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setPurpose(text);
          }}
          value={purpose}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          testID="purpose_input"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            HandleSubmitBtn();
          }}
          testID="submit_btn"
        >
          <Text style={styles.buttonTitle}>Submit PTO Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            HandleCancelBtn();
          }}
          testID="cancel_btn"
        >
          <Text style={styles.buttonTitle}>Cancel PTO Request</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
