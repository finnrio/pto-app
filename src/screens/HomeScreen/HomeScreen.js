import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles';

export default function HomeScreen(props) {

    return (
        <View style={styles.container}>
            <Text>You are logged in as user: {props.extraData.uid}</Text>
        </View>
    )
}