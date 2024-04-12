import { Alert, View } from "react-native";
import React, {useEffect, useState} from "react";
import {CalendarList} from 'react-native-calendars';
import styles from "./styles";

export default function CalendarScreen(props: any) {
    const [selected, setSelected] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        console.log("running the use effect");
        if(endDate) {
            console.log("Creating api request for PTO starting: ", startDate, " ending: ", endDate)
            Alert.alert('PTO Request Sent')
            setStartDate('');
            setEndDate('');
        };
    }, [endDate])

    useEffect(() => {
        console.log("selected use effect")
        if(selected) {
            console.log("something selected")
            startDate ? (
                endAlert()
            ) : (
                startAlert()
            )
        }
    }, [selected])

    const startAlert = () => Alert.alert(
        'PTO Request',
        `Create a PTO request starting on ${selected}`,
        [
            {
                text: 'Start Request',
                onPress: () => {
                    setStartDate(selected)
                    setSelected('')
                },
                style: 'default'
            },
            {
                text: 'Cancel',
                onPress: () => setSelected(''),
                style: 'cancel'
            }
        ],
        {cancelable: true}
    )

    const endAlert = () => Alert.alert(
        'PTO Request',
        `End PTO on ${selected}`,
        [
            {
                text: 'Complete Request',
                onPress: () => setEndDate(selected),
                style: 'default'
            },
            {
                text: 'Cancel Request',
                onPress: () => {
                    setStartDate('')
                    setSelected('')
                },
                style: 'destructive'
            },
            {
                text: 'Cancel',
                onPress: () => setSelected(''),
                style: 'cancel'
            }
        ],
        {cancelable: true}
    )

    return (
        <View style={styles.container}>
            <CalendarList
                onDayPress={day => setSelected(day.dateString)}
                markingType={'period'}
                markedDates={{
                    '2024-04-03': {startingDay: true, color: '#8ad4ff'},
                    '2024-04-04': {color: '#8ad4ff'},
                    '2024-04-05': {color: '#8ad4ff'},
                    '2024-04-06': {endingDay: true, color: '#8ad4ff'},
                    [startDate]: {color: '#2196F3', startingDay: true, endingDay: true}
                }} //testing marking style with hard coded dates
            />
        </View>
    )
}