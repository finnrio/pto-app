import { Alert, View } from "react-native";
import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import GetUserData from "../../firebase/operations/GetUserData";
import GetPTOByStatus from "../../firebase/operations/GetPTOByStatus";
import { UserContext } from "../../context/UserContext";

export default function EmployeeActivityScreen() {
  const currentUser = useContext(UserContext);
  const [pendingPTO, setPendingPTO] = useState<any[]>([]);
  const [approvedPTO, setApprovedPTO] = useState<any[]>([]);
  const [deniedPTO, setDeniedPTO] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      GetPTOByStatus(currentUser!.uid, "Pending").then((data) => {
        setPendingPTO(data);
      });
      GetPTOByStatus(currentUser!.uid, "Approved").then((data) => {
        setApprovedPTO(data);
      });
      GetPTOByStatus(currentUser!.uid, "Denied").then((data) => {
        setDeniedPTO(data);
      });
    }, []),
  );

  async function queryAlert(data: any) {
    const user = await GetUserData(data.user_id);
    Alert.alert(
      "PTO Request",
      `Employee: ${user.first_name} ${user.surname}\nReason: ${data.reason}\nStarting: ${data.start_date}\nEnding: ${data.end_date}\nHours Requested: ${data.hours}`,
    );
  }

  function createListItem(data: any) {
    return (
      <List.Item
        title={`${data.start_date} to ${data.end_date}`}
        key={data.id}
        onPress={() => queryAlert(data)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <List.AccordionGroup>
        <List.Accordion title="Pending" id="1">
          {pendingPTO.map((data) => createListItem(data))}
        </List.Accordion>
        <List.Accordion title="Approved" id="2">
          {approvedPTO.map((data) => createListItem(data))}
        </List.Accordion>
        <List.Accordion title="Denied" id="3">
          {deniedPTO.map((data) => createListItem(data))}
        </List.Accordion>
      </List.AccordionGroup>
    </View>
  );
}
