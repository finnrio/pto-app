import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ManagerDashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the Manager dashboard. Here you can create PTO requests for
        yourself and manager your teams PTO requests and events.
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Team Activity")}
      >
        <Text style={styles.buttonTitle}>Team Activity</Text>
      </TouchableOpacity>
    </View>
  );
}
