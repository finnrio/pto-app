import { Alert, View } from "react-native";
import React, { useState } from "react";
import { CalendarList } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import GetCurrentUserPTO from "../../firebase/firestore/GetCurrentUserPTO";
import GetMarkedDates from "./GetMarkedDates";
import GetCurrentUserData from "../../firebase/firestore/GetCurrentUserData";

export default function CalendarScreen({ navigation: { navigate } }: any) {
  const [startDate, setStartDate] = useState("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>();
  const [managerId, setManagerId] = useState("");

  function getPTOEvents() {
    GetCurrentUserPTO().then((events) => {
      setMarkedDates(GetMarkedDates(events));
    });
  }

  function resetScreen() {
    setStartDate("");
    getPTOEvents();
    GetCurrentUserData().then((data) =>
      data.manager_id
        ? setManagerId(data.manager_id)
        : Alert.alert("Error", "Manager ID not found"),
    );
  }

  const startAlert = (date: string) =>
    Alert.alert(
      "PTO Request",
      `Create a PTO request starting on ${date}`,
      [
        {
          text: "Start Request",
          onPress: () => {
            setStartDate(date);
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

  const endAlert = (date: string) =>
    Alert.alert(
      "PTO Request",
      `End PTO on ${date}`,
      [
        {
          text: "Complete Request",
          onPress: () => {
            navigate("PTO Request Form", {
              startDate,
              endDate: date,
              managerId,
            });
            resetScreen();
          },
          style: "default",
        },
        {
          text: "Cancel Request",
          onPress: () => {
            setStartDate("");
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );

  useFocusEffect(
    React.useCallback(() => {
      resetScreen();
    }, []),
  );

  return (
    <View style={styles.container}>
      <CalendarList
        onDayPress={(day) =>
          startDate ? endAlert(day.dateString) : startAlert(day.dateString)
        }
        markingType={"period"}
        markedDates={markedDates}
      />
    </View>
  );
}
