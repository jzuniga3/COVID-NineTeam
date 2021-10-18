import React from 'react'
import { StyleSheet, TextInput, Text, View, Platform } from 'react-native'
import styles from '../assets/styles/styles';

function AuthTextInput(props) {
    
    return (
        <View style={props.style}>
            <Text style={styles.AuthTextInputText}>{props.children}</Text>
            <TextInput 
            autoCapitalize='none'
            placeholder={props.placeholder} 
            style={styles.AuthTextInputTextInput}
            returnKeyType='done'
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            spellCheck={false}/>
        </View>
    )
}
export default AuthTextInput
