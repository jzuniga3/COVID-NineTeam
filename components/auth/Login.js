import React, { Component } from 'react'
import { View, Button, TextInput, Image, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../AuthTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import fire from '../fire'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
        this.onSignIn = this.onSignIn.bind(this)
    }

    //TODO: process codes for errors and display to user
    onSignIn() {
        const { email, password } = this.state;
        fire.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }


    render() {

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
                                    <Text style={styles.headerText}>Sign In</Text>
                                    <AuthTextInput 
                                        keyboardType='email-address'
                                        placeholder="example@gmail.com"
                                        onChangeText={email => this.setState({ email })}>
                                    Email</AuthTextInput>
                                    <AuthTextInput 
                                        secureTextEntry={true}
                                        onChangeText={password => this.setState({ password })}>
                                    Password</AuthTextInput>
                                <View style={styles.footerText}>
                                    <Text style={styles.textRegular}>Not Registered? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                        <Text style={styles.textBold}>Create Account</Text>
                                    </TouchableOpacity>
                                </View>
                                    <TouchableOpacity  onPress={() => this.onSignIn()}>
                                        <Text style={styles.button}>Login</Text>
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
        marginBottom: 70,
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
        marginTop: '53%',
        marginLeft: '45%'
        
    },
    ios: {
        height: '100%', 
        width: '100%' 
    }
}