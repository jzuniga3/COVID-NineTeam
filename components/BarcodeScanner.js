import React, { useState, useEffect }  from "react";
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Alert} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import {sendApiRequest} from "../screens/old/Edamam";
import styles from '../screens/old/globalstyles.js';
import fire from './fire';



export const BarcodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [pageSwitch, setPageSwitch] = useState(false);
    const [calories, setCalories] = useState(0);
    const [foodName, setFoodName] = useState("");

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    //flip switch to transition back to barcode scanner
    function pageSwitchHandler() {
        setPageSwitch(!pageSwitch);
    }
    function CalorieCount() {
        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/caloriesConsumed").on('value',(snapshot => {
            const data = snapshot.val();
            setCalories(data);
        }))
    }

    function handleSaveFood(name) {
        name => console.log("OK Pressed, Food Name: " + name)
        setFoodName(name)
        let newDailyFood = { name: name, calories: calories}

        usersDB.doc(userID).collection("DailyFood").add(newDailyFood)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Error', error.message, [{text: 'OK'},], {cancelable: true});
        });
    }
//triggered after scanning barcode, flips switches and transitions to calorie view
    const handleBarCodeScanned = ({data}) => {
        setScanned(true);
        sendApiRequest(data);
        setPageSwitch(true);
        CalorieCount();
        setScanned(false);
    };
// prompt for permissions access from the user device
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function addToFood() {
        Alert.prompt(
            "Enter Food Name",
            "",
            [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: (name) => handleSaveFood(name)
                }
              ],
        )
    }
// returns the page view for the barcode scanner
    return (
        <>

        {pageSwitch ? (
        <View style={styles.container}>
            <Text>Calories: {calories}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={pageSwitchHandler}>
                <Text>Scan Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={addToFood}>
                <Text>Add To Food</Text>
            </TouchableOpacity>

        </View>

        ):(
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />
            <View style = {styles.scannerMask}/>
        </View>
        )}
        </>
    );
}




