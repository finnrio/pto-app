import { Alert, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { List } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import GetUserData from "../../firebase/operations/GetUserData";
import GetSubordinates from "../../firebase/operations/GetSubordinates";
import GetPTOByStatus from "../../firebase/operations/GetPTOByStatus";
import { UserContext } from "../../context/UserContext";
import ApprovePTO from "../../firebase/operations/ApprovePTO";
import DenyPTO from "../../firebase/operations/DenyPTO";

export default function ManagerActivityScreen() {
  const currentUser = useContext(UserContext);
  const [pendingPTO, setPendingPTO] = useState<any[]>([]);
  const [approvedPTO, setApprovedPTO] = useState<any[]>([]);
  const [deniedPTO, setDeniedPTO] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const handleApprovePTO = useCallback(
    async (userId: string, ptoId: string) => {
      ApprovePTO(userId, ptoId)
        .then(() => {
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Error", "Failed to approve PTO request");
        });
    },
    [],
  );

  const handleDenyPTO = useCallback(async (userId: string, ptoId: string) => {
    DenyPTO(userId, ptoId)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to deny PTO request");
      });
  }, []);

  const pendingAlert = useCallback(
    async (data: any) => {
      const user = await GetUserData(data.user_id);
      Alert.alert(
        "PTO Request",
        `Employee: ${user.first_name} ${user.surname}\nReason: ${data.reason}\nStarting: ${data.start_date}\nEnding: ${data.end_date}\nHours Requested: ${data.hours}`,
        [
          {
            text: "Approve",
            onPress: () => handleApprovePTO(data.user_id, data.id),
          },
          {
            text: "Deny",
            onPress: () => handleDenyPTO(data.user_id, data.id),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true },
      );
    },
    [handleApprovePTO, handleDenyPTO],
  );

  const queryAlert = useCallback(async (data: any) => {
    const user = await GetUserData(data.user_id);
    Alert.alert(
      "PTO Request",
      `Employee: ${user.first_name} ${user.surname}\nReason: ${data.reason}\nStarting: ${data.start_date}\nEnding: ${data.end_date}\nHours Requested: ${data.hours}`,
    );
  }, []);

  function createListItem(data: any) {
    if (data.status === "Pending") {
      return (
        <List.Item
          title={`${data.start_date} to ${data.end_date}`}
          key={data.id}
          onPress={() => pendingAlert(data)}
        />
      );
    }
    return (
      <List.Item
        title={`${data.start_date} to ${data.end_date}`}
        key={data.id}
        onPress={() => queryAlert(data)}
      />
    );
  }

  const fetchData = useCallback(() => {
    GetSubordinates(currentUser!.uid).then((subordinates) => {
      const pendingPromises = subordinates.map(async (subordinate: any) => {
        return GetPTOByStatus(subordinate.id, "Pending").then((data) => {
          return data.map((pto) => createListItem(pto));
        });
      });
      const approvedPromises = subordinates.map(async (subordinate: any) => {
        return GetPTOByStatus(subordinate.id, "Approved").then((data) => {
          return data.map((pto) => createListItem(pto));
        });
      });
      const deniedPromises = subordinates.map(async (subordinate: any) => {
        return GetPTOByStatus(subordinate.id, "Denied").then((data) => {
          return data.map((pto) => createListItem(pto));
        });
      });
      Promise.all(pendingPromises).then((data) => {
        setPendingPTO(data.flat());
      });
      Promise.all(approvedPromises).then((data) => {
        setApprovedPTO(data.flat());
      });
      Promise.all(deniedPromises).then((data) => {
        setDeniedPTO(data.flat());
      });
    });
  }, [refresh]);

  useFocusEffect(fetchData);

  return (
    <View style={styles.container}>
      <List.AccordionGroup>
        <List.Accordion title="Pending" id="1" testID="pending_accordion">
          {pendingPTO}
        </List.Accordion>
        <List.Accordion title="Approved" id="2" testID="approved_accordion">
          {approvedPTO}
        </List.Accordion>
        <List.Accordion title="Denied" id="3" testID="denied_accordion">
          {deniedPTO}
        </List.Accordion>
      </List.AccordionGroup>
    </View>
  );
}
