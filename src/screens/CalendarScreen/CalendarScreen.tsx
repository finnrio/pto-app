import { Alert } from "react-native";
import React, { useContext, useState } from "react";
import { CalendarList } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
import GetCurrentUserData from "../../firebase/firestore/GetCurrentUserData";
import { GetPTOEventsByUserID } from "../../firebase/firestore/GetPTOEvent";
import GetSubordinates from "../../firebase/firestore/GetSubordinates";
import { UserContext } from "../../context/UserContext";
import GetUsersProfileColor from "../../firebase/firestore/GetUsersProfileColor";
import { GetDottedDatesFromEvents, MergeEvents } from "./helper";

export default function CalendarScreen({ navigation: { navigate } }: any) {
  const currentUser = useContext(UserContext);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [startDate, setStartDate] = useState("");
  const [managerId, setManagerId] = useState("");

  function managerRender() {
    let mergedEvents: any = {};
    // Get the current user's PTO events
    if (!currentUser) return;
    GetPTOEventsByUserID(currentUser.uid).then(async (events) => {
      const color = await GetUsersProfileColor(currentUser.uid);
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
          const color = await GetUsersProfileColor(subordinate.id);
          const subordinateDotKey = { key: subordinate.id, color };
          return GetPTOEventsByUserID(subordinate.id).then((events) => {
            mergedEvents = MergeEvents(
              mergedEvents,
              GetDottedDatesFromEvents(events, subordinateDotKey),
            );
          });
        });

        Promise.all(promises).then(() => {
          setMarkedDates(mergedEvents);
        });
      })
      .catch((error) => {
        console.log("Error getting subordinates: ", error);
      });
  }

  function userRender() {
    if (!currentUser) return;
    GetPTOEventsByUserID(currentUser.uid).then(async (events) => {
      const color = await GetUsersProfileColor(currentUser.uid!);
      setMarkedDates(
        GetDottedDatesFromEvents(events, {
          key: currentUser.uid,
          color,
          selected: true,
          selectedColor: color,
        }),
      );
    });
  }

  function render() {
    setStartDate("");
    GetCurrentUserData().then(async (data) => {
      if (data.manager_id) {
        setManagerId(data.manager_id);
      } else {
        Alert.alert("Error", "Manager ID not found");
      }
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
              managerId,
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

  return (
    <CalendarList
      onDayPress={(day) =>
        startDate ? endAlert(day.dateString) : startAlert(day.dateString)
      }
      markingType={"multi-dot"}
      markedDates={markedDates}
    />
  );
}
