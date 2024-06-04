import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function UserDashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the employee user dashboard. Here you can create and query
        PTO requests and events.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("My Activity")}
      >
        <Text style={styles.buttonTitle}>My Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={styles.buttonTitle}>Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}
