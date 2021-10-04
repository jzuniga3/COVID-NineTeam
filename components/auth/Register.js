import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Button, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';
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
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => 
            {
            })
            .catch((error) => {
            console.log(error);            
            Alert.alert(
                'Error',
                error.message,
                [
                {text: 'OK'},
                ],
                { 
                cancelable: true 
                }
            );
        })
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
                                        onChangeText={email => this.setState({ email })}>
                                    Email</AuthTextInput>
                                    <AuthTextInput 
                                        secureTextEntry={true}
                                        onChangeText={password => this.setState({ password })}>
                                    Password</AuthTextInput>
                                    <AuthTextInput 
                                        secureTextEntry={true}
                                        onChangeText={confirmPassword => this.setState({ confirmPassword })}>
                                    Confirm Password</AuthTextInput>
                                <View style={styles.footerText}>
                                    <Text style={styles.textRegular}>Already Registered? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                        <Text style={styles.textBold}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                    <TouchableOpacity onPress={() => this.validatePassword(navigation)}>
                                        <Text style={styles.button}>Create Account</Text>
                                    </TouchableOpacity>
                            </KeyboardAwareScrollView>
                        </SafeAreaView>
                    </LinearGradient>
                </View>
            )
        }
    }

const styles = 
{
    loginPrompt:
    {
        marginTop: 30,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 70
    },
    loginImage:
    {
        width: 250,
        height: 250,
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    inputLabel:
    {
        width: 280,
        height: 45,
        borderColor: "#43519D",
        backgroundColor: "#FFFFFF"
    },
    userLabel:
    {
        fontSize: 20,
        color: "#414E93"
    },
    contentCenter:
    {
        height: '100%',
        backgroundColor: "#192879",
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
    },
    logo: {
        width: 163,
        height: 161,
        paddingTop: '5%'
    },
    headerText: {
        fontSize: 22,
        color: '#FFF',
        fontFamily: 'NunitoSans-Bold',
        paddingHorizontal: 51,
        marginBottom: 7
    },
    footerText: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginRight: 37,
    },
    textBold: {
        color: '#FFF',
        fontFamily: 'NunitoSans-Bold',
        fontSize: 14
    },
    textRegular: {
        color: '#FFF',
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14

    },
    button: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: '35%',
        marginTop: '32%'
    },
    ios: {
        height: '100%', 
        width: '100%' 
    }
}