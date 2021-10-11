import React, { Component } from 'react'
import { View, Button, Image, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

import fire from '../fire'

export default class CreateProfile extends Component {

    constructor(props) {
        super(props)

        this.state = 
        {
            email: this.props.route.params.email,
            password: this.props.route.params.password,
            name: this.props.route.params.name,
            sex: this.props.route.params.sex,
            age: this.props.route.params.age,
            feet: this.props.route.params.feet,
            inches: this.props.route.params.inches,
            weight: this.props.route.params.weight,
            bmi: this.props.route.params.bmi,
            purpose: '',
            id: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    //TODO: process codes for errors and display to user
    onSignUp = () => 
    {
        const { name, sex, age, feet, inches, weight, bmi, purpose } = this.state;

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((result) => 
        {
            fire.firestore().collection("users")
            .doc(fire.auth().currentUser.uid)
            .set({
                name,
                sex,
                age,
                feet,
                inches,
                weight,
                bmi,
                purpose,
                profilePicId: 'https://firebasestorage.googleapis.com/v0/b/weightexchangeapp.appspot.com/o/image%2Fdefault-avatar.jpg?alt=media&token=48a4f400-61aa-4b78-9b02-392a320b15f9',
                id: fire.auth().currentUser.uid
            }).then(() => 
            {
                console.log("Document successfully written!");
                this.setState({ bmi: bmi });
            })
            .catch((error) => 
            {
                console.error("Error writing document: ", error);
            })
        }).catch((error) => 
        {
            console.log(error);
            Alert.alert('Error', error.message, [{text: 'OK'},], {cancelable: true});
        })
    }

    validatePurpose = () =>
    {
        if (this.state.purpose != '' || 'Would you like to donate weight, or receive weight?')
        {
            this.onSignUp();
        }
        else
        {
            alert('This field cannot be empty!')
        }
    }

    render() {
        // inherit navigation from parent
        const { navigate } = this.props.navigation;

        return (
                
            <View style = {styles.contentCenter}>
            <Image style = {styles.loginImage} source = {require("../../assets/icon.png")}/>
                <View style = {styles.loginPrompt}>      
                    <RNPickerSelect
                        style = {{backgroundColor: 'white'}}
                        placeholder = {{label:'Would you like to donate weight, or receive weight?', value: ''}}
                        items = {[{label: 'Donate', value: 'donate'}, {label: 'Receive', value: 'receive'}]}
                        onValueChange={purpose => this.setState({ purpose })}
                        returnKeyType = 'done'
                    />
                    <Button
                        onPress={() => this.validatePurpose()}
                        title="Register"
                    />
                </View>
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