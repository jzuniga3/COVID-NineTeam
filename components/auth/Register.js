import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Button, TextInput, Image } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

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

        if (password != confirmPassword)
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
        let {currentView} = this.state

        if (currentView == 1)
        {
            return (
                <View style = {styles.contentCenter}>
                <StatusBar barStyle='light-content' />
                <Image style = {styles.loginImage} source = {require("../../assets/icon.png")}/>
                    <View style = {styles.loginPrompt}>      
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="email"
                            mode = "outlined"
                            returnKeyType = 'done'
                            keyboardType = 'email-address'
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="Password"
                            mode = "outlined"
                            returnKeyType = 'done'
                            keyboardType = 'visible-password'
                            secureTextEntry={ true }
                            onChangeText={password => this.setState({ password })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="Confirm password"
                            mode = "outlined"
                            returnKeyType = 'done'
                            keyboardType = 'visible-password'
                            secureTextEntry={ true }
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        />
                    
                        <Button
                            mode = "contained"
                            onPress = {() => this.validatePassword()}
                            title = "Next"
                        />
                    </View>
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
                            mode = "contained"
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
    }
}