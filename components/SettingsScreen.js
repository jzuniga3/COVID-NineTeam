import {Text, View, TouchableOpacity} from "react-native";
import React from "react";
import fire from "./fire";
import styles from './globalstyles.js';

const handleLogout = () => {
    fire.auth().signOut();
};

export default function SettingsScreen() {
    return (
        <View style={styles.settingScreen}>
            <Text>Settings!</Text>
            <View>
                <TouchableOpacity onPress = {handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
