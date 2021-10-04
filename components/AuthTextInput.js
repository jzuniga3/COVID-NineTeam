import React from 'react'
import { StyleSheet, TextInput, Text, View, Platform } from 'react-native'

function AuthTextInput(props) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
            <TextInput 
            autoCapitalize='none'
            placeholder={props.placeholder} 
            style={styles.textInput}
            returnKeyType='done'
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            spellCheck={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: 70,
        width: '85%',
        marginLeft: '7%',
        marginBottom: '4%',
        borderRadius: 24,
    },
    text: {
        marginLeft: '8%',
        fontSize: 14,
        marginTop: '3%',
        fontFamily: 'Montserrat-SemiBold',
        color: '#12121F'
    },
    textInput: {
        marginLeft: '8%',
        marginTop: Platform.OS === "ios"? "3%" : 0,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15
    }
})
  

export default AuthTextInput
