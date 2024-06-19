import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignInWithEmailAndPassword from "../../firebase/operations/SignInWithEmailAndPassword";
import styles from "./styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = () => {
    SignInWithEmailAndPassword(email, password).catch((error) => {
      console.error(error.code);
      Alert.alert(error.code);
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <MaterialCommunityIcons name="timetable" size={120} style={styles.logo} />
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            HandleLogin();
          }}
          testID="login_button"
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
