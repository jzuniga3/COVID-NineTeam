import React, { useState } from 'react';
import {Text, View, TextInput, TouchableOpacity } from 'react-native';
import fire from '../../components/fire';
import styles from './globalstyles.js';

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [emailError] = useState('');
    function passwordReset() {
           return fire.auth().sendPasswordResetEmail(email)
        }
    return (
        <View style={styles.forgotScreen}>
            <View style ={{marginBottom: 10}}><Text style ={{fontWeight:'bold'}}>Enter your email here</Text></View>
                <View style ={styles.forgotScreen2}>
                    <TextInput
                            style={styles.inputText}
                            placeholder="Email Address..."
                            placeholderTextColor="#003f5c"
                            onChangeText={setEmail}/>
                </View>
                <View><Text>{emailError}</Text></View>
                <View><TouchableOpacity onPress = {passwordReset}><Text>Submit</Text></TouchableOpacity></View>
        </View>
    );
}
