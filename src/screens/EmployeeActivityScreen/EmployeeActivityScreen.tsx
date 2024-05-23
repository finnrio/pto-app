import { View } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import styles from "./styles";

export default function EmployeeActivityScreen() {
  const pendingtestdata = [
    {
      id: "1",
      start_date: "2024-04-06",
      end_date: "2024-04-26",
    },
    {
      id: "2",
      start_date: "2024-05-13",
      end_date: "2024-05-14",
    },
    {
      id: "3",
      start_date: "2024-05-16",
      end_date: "2024-05-17",
    },
    {
      id: "4",
      start_date: "2024-05-16",
      end_date: "2024-05-17",
    },
  ];

  const approvedtestdata = [
    {
      id: "1",
      start_date: "2024-04-06",
      end_date: "2024-04-26",
    },
    {
      id: "2",
      start_date: "2024-05-13",
      end_date: "2024-05-14",
    },
    {
      id: "3",
      start_date: "2024-05-16",
      end_date: "2024-05-17",
    },
    {
      id: "4",
      start_date: "2024-05-16",
      end_date: "2024-05-17",
    },
  ];

  const deniedtestdata = [
    {
      id: "1",
      start_date: "2024-04-06",
      end_date: "2024-04-26",
    },
    {
      id: "2",
      start_date: "2024-05-13",
      end_date: "2024-05-14",
    },
    {
      id: "3",
      start_date: "2024-05-16",
      end_date: "2024-05-17",
    },
    {
      id: "4",
      start_date: "2024-05-16",
      end_date: "2024-05-17",
    },
  ];

  function createListItem(data: any) {
    return (
      <List.Item
        title={`${data.start_date} to ${data.end_date}`}
        key={data.id} // this should be unique from the database entry
        // onPress={ //some sort of alert or modal or dialog with more information
        //     Alert.alert("ddd", "This request was created by xxx and is from date xxx-xx-xx to date xxxx-xx-xx")
        // }
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.listContainer}> */}
      {/* prevents all being open at once */}
      <List.AccordionGroup>
        <List.Accordion title="Pending" id="1">
          {/* {pendingtestdata.map((x, i) => (
                        <List.Item title={`${x.start_date} to ${x.end_date}`} key={i} />
                    ))} */}
          {pendingtestdata.map((data) => createListItem(data))}
        </List.Accordion>
        <List.Accordion title="Approved" id="2">
          {approvedtestdata.map((x, i) => (
            <List.Item title={`${x.start_date} to ${x.end_date}`} key={i} />
          ))}
        </List.Accordion>
        <List.Accordion title="Denied" id="3">
          {deniedtestdata.map((x, i) => (
            <List.Item title={`${x.start_date} to ${x.end_date}`} key={i} />
          ))}
        </List.Accordion>
      </List.AccordionGroup>
      {/* </View> */}
    </View>
  );
}
