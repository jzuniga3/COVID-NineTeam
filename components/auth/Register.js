import React, { Component } from 'react'
import { View, Button, TextInput, Image } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

import fire from '../fire'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            sex: '',
            age: '',
            feet: '',
            inches: '',
            weight: '',
            currentView: 1
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    //TODO: process codes for errors and display to user
    onSignUp() {
        const { name, email, password, sex, age, feet, inches, weight} = this.state;
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
                weight
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
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

        //Check if any values are empty
        if (name == '' || sex == '' || age == '' || feet == '' || inches == '' || weight == '')
        {
            alert("Fill out all fields.");
        }
        //Check if number values are not numbers
        else if (isNaN(age) || isNaN(feet) || isNaN(inches) || isNaN(weight))
        {
            alert("Some of your responses are invalid.");
        }
        //Check if age is valid
        else if (age < 1 || age > 120)
        {
            alert("Enter a valid age.");
        }
        //Check if height is valid
        else if (inches < 0 || inches > 11 || feet < 0 || feet > 10)
        {
            alert("Enter a valid height.");
        }
        //Check if weight is valid
        else if (weight < 0 || weight > 1500)
        {
            alert("Enter a valid weight.");
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
                <View style = {{height: 680, backgroundColor: "#192879"}}>
                <Image style = {styles.loginImage} source = {require("../../assets/icon.png")}/>
                    <View style = {styles.loginPrompt}>      
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="email"
                            mode = "outlined"
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="Password"
                            mode = "outlined"
                            secureTextEntry={ true }
                            onChangeText={password => this.setState({ password })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="Confirm password"
                            mode = "outlined"
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
                <View style = {{height: 680, backgroundColor: "#192879"}}>
                <Image style = {styles.loginImage} source = {require("../../assets/icon.png")}/>
                    <View style = {styles.loginPrompt}>      
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="name"
                            mode = "outlined"
                            onChangeText={name => this.setState({ name })}
                        />
                        <RNPickerSelect
                            placeholder = {{label:'Select your sex...', value: null}}
                            items = {[{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}]}
                            onValueChange={sex => this.setState({ sex })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="age"
                            mode = "outlined"
                            onChangeText={age => this.setState({ age })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="height in feet"
                            mode = "outlined"
                            onChangeText={feet => this.setState({ feet })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="height in inches"
                            mode = "outlined"
                            onChangeText={inches => this.setState({ inches })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="weight"
                            mode = "outlined"
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
}