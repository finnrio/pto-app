import React from 'react'
import { Button, Text, View } from 'react-native'
import {  collection, addDoc, setDoc, doc } from 'firebase/firestore';
import styles from './styles';
import { FIRESTORE_DB } from '../../firebase/config';

export default function HomeScreen(props) {

    async function btnFunctionAddUser(){
        try {
            await setDoc(doc(FIRESTORE_DB, "dev-app-data", props.extraData.uid), {
              first: "Archie",
              last: "Sanger-Davies",
              born: 2001
            });
            console.log("Document written with ID: ", props.extraData.uid);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }


    // this function will be used in the code to add to a "requests" collection within the current users id document within a collection called "dev-app-data"
    async function btnFunctionPTOReq(){
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, "dev-app-data", "test", "requests"), {
                start_date: "2024-04-04",
                end_date: "2024-04-14",
                status: "approved"
            });
            console.log("PTO Request created: ", docRef.id);
        } catch (e) {
            console.error("Error creating PTO request: ", e);
        }
    }

    return (
        <View style={styles.container}>
            <Text>You are logged in as user: {props.extraData.uid}</Text>
            <Button onPress={btnFunctionAddUser} title={"Add an entry to DB"} />
            <Button onPress={btnFunctionPTOReq} title={"Add a test PTO request to DB"} />
        </View>
    )
}