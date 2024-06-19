import { Alert, View } from "react-native";
import React, { useContext, useState } from "react";
import { CalendarList } from "react-native-calendars";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import GetUserData from "../../firebase/operations/GetUserData";
import GetPTO from "../../firebase/operations/GetPTO";
import GetSubordinates from "../../firebase/operations/GetSubordinates";
import { UserContext } from "../../context/UserContext";
import { GetDottedDatesFromEvents, MergeEvents } from "./helper";

export default function CalendarScreen({ navigation: { navigate } }: any) {
  const currentUser = useContext(UserContext);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(true);

  function managerRender() {
    let mergedEvents: any = {};
    // Get the current user's PTO events
    if (!currentUser) return;
    GetPTO(currentUser.uid).then(async (events: any) => {
      const color = (await GetUserData(currentUser.uid)).user_color;
      mergedEvents = GetDottedDatesFromEvents(events, {
        key: currentUser.uid,
        color,
        selected: true,
        selectedColor: color,
      });
    });
    // Get the current user's subordinates' PTO events
    GetSubordinates(currentUser.uid)
      .then((subordinates) => {
        const promises = subordinates.map(async (subordinate: any) => {
          const color = (await GetUserData(subordinate.id)).user_color;
          const subordinateDotKey = { key: subordinate.id, color };
          return GetPTO(subordinate.id).then((events: any) => {
            mergedEvents = MergeEvents(
              mergedEvents,
              GetDottedDatesFromEvents(events, subordinateDotKey),
            );
          });
        });

        Promise.all(promises).then(() => {
          setMarkedDates(mergedEvents);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log("Error getting subordinates: ", error);
      });
  }

  function userRender() {
    if (!currentUser) return;
    GetPTO(currentUser.uid)
      .then(async (events: any) => {
        const color = (await GetUserData(currentUser.uid)).user_color;
        setMarkedDates(
          GetDottedDatesFromEvents(events, {
            key: currentUser.uid,
            color,
          }),
        );
      })
      .then(() => setLoading(false));
  }

  function render() {
    setLoading(true);
    setStartDate("");
    GetUserData(currentUser!.uid).then(async (data) => {
      if (data.role === "Manager") {
        managerRender();
      } else {
        userRender();
      }
    });
  }

  const startAlert = (date: string) =>
    Alert.alert(
      "PTO Request",
      `Create a PTO request starting on ${date}`,
      [
        {
          text: "Start Request",
          onPress: () => setStartDate(date),
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );

  const endAlert = (date: string) => {
    // Check if end date is after start date
    const start = new Date(startDate);
    const end = new Date(date);
    if (start > end) {
      Alert.alert("Error", "End date must be after start date");
      return;
    }

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
            });
            render();
          },
          style: "default",
        },
        {
          text: "Cancel Request",
          onPress: () => setStartDate(""),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      render();
    }, []),
  );

  return loading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  ) : (
    <CalendarList
      onDayPress={(day) =>
        startDate ? endAlert(day.dateString) : startAlert(day.dateString)
      }
      markingType={"multi-dot"}
      markedDates={markedDates}
    />
  );
}
