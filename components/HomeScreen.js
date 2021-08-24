import React, {useState} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {BarcodeScanner} from "./BarcodeScanner";

export default function HomeScreen() {

    const [isItScanning, changeScanning] = useState(false);
    function isScanningHandler() {
        changeScanning(!isItScanning);
    }
    return (
    <>
        {isItScanning ?(<BarcodeScanner/>):(
                    <>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress = {isScanningHandler}><Text>Scan Calories With UPC</Text></TouchableOpacity>
                        </View>
                    </>
        )}
    </>
    )
}



