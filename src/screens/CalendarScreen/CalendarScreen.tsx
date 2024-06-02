import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";
import styles from "./styles";
import GetCurrentUserPTO from "../../firebase/firestore/GetCurrentUserPTO";
import GetMarkedDates from "./GetMarkedDates";

export default function CalendarScreen() {
  const [selected, setSelected] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ptoEvents, setPtoEvents] = useState<any[]>();

  function getPTOEvents() {
    GetCurrentUserPTO().then((events) => {
      setPtoEvents(events);
    });
  }

  const startAlert = () =>
    Alert.alert(
      "PTO Request",
      `Create a PTO request starting on ${selected}`,
      [
        {
          text: "Start Request",
          onPress: () => {
            setStartDate(selected);
            setSelected("");
          },
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => setSelected(""),
          style: "cancel",
        },
      ],
      { cancelable: true },
    );

  const endAlert = () =>
    Alert.alert(
      "PTO Request",
      `End PTO on ${selected}`,
      [
        {
          text: "Complete Request",
          onPress: () => setEndDate(selected),
          style: "default",
        },
        {
          text: "Cancel Request",
          onPress: () => {
            setStartDate("");
            setSelected("");
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => setSelected(""),
          style: "cancel",
        },
      ],
      { cancelable: true },
    );

  useEffect(() => {
    console.log("Rendering users PTO events");
    getPTOEvents();
  }, []);

  // TODO API call to create PTO request, this might not need to be an effect hook
  useEffect(() => {
    if (endDate) {
      console.log(
        "Creating api request for PTO starting: ",
        startDate,
        " ending: ",
        endDate,
      );
      Alert.alert("PTO Request Sent");
      setStartDate("");
      setEndDate("");
    }
  }, [endDate]);

  useEffect(() => {
    if (selected) {
      if (startDate) {
        endAlert();
      } else {
        startAlert();
      }
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      <CalendarList
        onDayPress={(day) => setSelected(day.dateString)}
        markingType={"period"}
        markedDates={GetMarkedDates(ptoEvents)}
      />
    </View>
  );
}
