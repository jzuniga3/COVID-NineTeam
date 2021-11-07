import React, {useState} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { BarcodeScanner } from './BarcodeScanner';

export default function BarcodeScreen() {

    const [isItScanning, changeScanning] = useState(false);
    function isScanningHandler() {
        changeScanning(!isItScanning);
    }
    return (
    <>
        <BarcodeScanner/>
    </>
    )
}



