import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
// import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {

    
    return (
        <View style={styles.container}>
            <Text>You are logged in as user: {props.extraData.uid}</Text>
        </View>
    )
}