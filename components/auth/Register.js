import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Button, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            sex: '',
            age: '',
            feet: '',
            inches: '',
            weight: '',
            bmi: '',
            currentView: 1
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    //TODO: process codes for errors and display to user
    onSignUp() {

        const { name, email, password, sex, age, feet, inches, weight, bmi } = this.state;

        var total_height = ((12 * parseInt(feet)) + parseInt(inches));
        var bmiCalc = (parseFloat(( parseFloat(weight) / (total_height**2)) * 703)).toFixed(2);

        fire.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            fire.firestore().collection("users")
            .doc(fire.auth().currentUser.uid)
            .set({
                name,
                email,
                sex,
                age,
                feet,
                inches,
                weight,
                bmi: bmiCalc
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
        
        this.setState({ bmi: bmiCalc });
    }

    validatePassword = () => 
    {
        const { password, confirmPassword } = this.state;

        if (password == '') {
            alert("Password cannot be blank!")
        }
        else if (password != confirmPassword)
        {
            alert("Your passwords do not match!");
        }
        else
        {
            this.setState({currentView: 2})
        }
    }

    validateNumbers = () =>
    {
        const { name, sex, age, feet, inches, weight } = this.state;
        var errorMsg = 'Invalid fields:';
        var isError = false;

        //Check if name is empty
        if (name == '')
        {
            errorMsg += '\nName';
            isError = true;
        }
        //Check if sex is empty
        if (sex == '' || sex == 'Select your sex...')
        {
            errorMsg += '\nSex';
            isError = true;
        }
        //Check if age is valid
        if (age == '' || isNaN(age) || age < 1 || age > 120)
        {
            errorMsg += '\nAge';
            isError = true;
        }
        //Check if height is valid
        if (inches == '' || isNaN(inches) || inches < 0 || inches > 11 || feet == '' || isNaN(feet) || feet < 0 || feet > 10)
        {
            errorMsg += '\nHeight';
            isError = true;
        }
        //Check if weight is valid
        if (weight == '' || isNaN(weight) || weight < 0 || weight > 1500)
        {
            errorMsg += '\nWeight';
            isError = true;
        }

        //If an error was detected.
        if (isError == true)
        {
            alert(errorMsg);
            isError = false;
        }
        //If everything is valid
        else
        {
            this.onSignUp();
        }
    }

    render() {
        const {navigation} = this.props;

        let {currentView} = this.state

        if (currentView == 1)
        {
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
                        <TouchableOpacity onPress={() => this.validatePassword()}>
                            <Text style={styles.button}>Create Account</Text>
                        </TouchableOpacity>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    </View>
            )
        }
        else if (currentView == 2)
        {
            return (
                <View style = {styles.contentCenter}>
                <Image style = {styles.loginImage} source = {require("../../assets/icon.png")}/>
                    <View style = {styles.loginPrompt}>      
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="name"
                            mode = "outlined"
                            returnKeyType = 'done'
                            onChangeText={name => this.setState({ name })}
                        />
                        <RNPickerSelect
                            style = {{backgroundColor: 'white'}}
                            placeholder = {{label:'Select your sex...', value: ''}}
                            items = {[{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}]}
                            onValueChange={sex => this.setState({ sex })}
                            returnKeyType = 'done'
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="age"
                            mode = "outlined"
                            keyboardType = 'number-pad'
                            returnKeyType = 'done'
                            onChangeText={age => this.setState({ age })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="height in feet"
                            mode = "outlined"
                            returnKeyType = 'done'
                            keyboardType = 'number-pad'
                            onChangeText={feet => this.setState({ feet })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="height in inches"
                            mode = "outlined"
                            returnKeyType = 'done'
                            keyboardType = 'number-pad'
                            onChangeText={inches => this.setState({ inches })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="weight"
                            mode = "outlined"
                            returnKeyType = 'done'
                            keyboardType = 'numeric'
                            onChangeText={weight => this.setState({ weight })}
                        />

                        <Button
                            onPress={() => this.validateNumbers()}
                            title="Register"
                        />
                    </View>
                </View>
            )
        }
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