import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ManagerDashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the Manager dashboard. Here you can create PTO requests for
        yourself and manage your teams PTO requests and events.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("My Activity")}
        testID="my_activity_btn"
      >
        <Text style={styles.buttonTitle}>My Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
        testID="calendar_btn"
      >
        <Text style={styles.buttonTitle}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Team Activity")}
        testID="team_activity_btn"
      >
        <Text style={styles.buttonTitle}>Team Activity</Text>
      </TouchableOpacity>
    </View>
  );
}
