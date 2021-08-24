import React, { useState, useEffect }  from "react";
import {Text, View, StyleSheet, TouchableOpacity,Dimensions} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import {sendApiRequest} from "./Edamam";
import styles from './globalstyles.js';
import fire from './fire';



export const BarcodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [pageSwitch, setPageSwitch] = useState(false);
    const [calories, setCalories] = useState(0);
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
// returns the page view for the barcode scanner
    return (
        <>

        {pageSwitch ? (
        <View style={styles.container}>
            <Text>Calories: {calories}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={pageSwitchHandler}>
                <Text>Scan Again</Text>
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




