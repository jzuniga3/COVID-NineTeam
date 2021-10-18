import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Button, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../AuthTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import fire from '../fire'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = 
        {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    validatePassword = () => 
    {
        const { email, password, confirmPassword } = this.state;

        if (password == '') {
            alert("Password cannot be blank!")
        }
        else if (password != confirmPassword)
        {
            alert("Your passwords do not match!");
        }
        else
        {
            this.props.navigation.navigate("CreateProfile", {email: email, password: password});
        }
    }

    
    render() {
        // inherit navigation from parent
        const {navigation} = this.props;
            return (
                <View style={styles.container}>
                    <LinearGradient
                    // Background Linear Gradient
                    colors={[colors.lightBlue, colors.darkBlue]}
                    style={styles.background}
                    >
                        <SafeAreaView>
                            <KeyboardAwareScrollView
                                resetScrollToCoords={{ x: 0, y: 0 }}
                                scrollEnabled={false}
                                contentContainerStyle={ Platform.OS === "ios" ? styles.ios : {} }
                                >
                                <View style={{ alignItems: 'center'}}>
                                    <Image 
                                    source={require('../../assets/images/logo.png')}
                                    style={styles.logo}
                                    />
                                </View>
                                    <Text style={styles.headerText}>Sign Up</Text>
                                    <AuthTextInput 
                                        keyboardType='email-address'
                                        placeholder="example@gmail.com"
                                        style={styles.AuthTextInputContainer}
                                        onChangeText={email => this.setState({ email })}>
                                    Email</AuthTextInput>
                                    <AuthTextInput 
                                        secureTextEntry={true}
                                        style={styles.AuthTextInputContainer}
                                        onChangeText={password => this.setState({ password })}>
                                    Password</AuthTextInput>
                                    <AuthTextInput 
                                        secureTextEntry={true}
                                        style={styles.AuthTextInputContainer}
                                        onChangeText={confirmPassword => this.setState({ confirmPassword })}>
                                    Confirm Password</AuthTextInput>
                                <View style={styles.footerText}>
                                    <Text style={styles.textRegular}>Already Registered? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                        <Text style={styles.textBold}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                    <TouchableOpacity onPress={() => this.validatePassword(navigation)}>
                                        <Text style={styles.RegisterButton}>Create Account</Text>
                                    </TouchableOpacity>
                            </KeyboardAwareScrollView>
                        </SafeAreaView>
                    </LinearGradient>
                </View>
            )
        }
    }