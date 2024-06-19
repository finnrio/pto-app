import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function AdminDashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the Admin dashboard. Here you can register and manage users.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Admin User Management")}
        testID="user_management_btn"
      >
        <Text style={styles.buttonTitle}>Manage Users</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register a User")}
        testID="register_user_btn"
      >
        <Text style={styles.buttonTitle}>Register a User</Text>
      </TouchableOpacity>
    </View>
  );
}
