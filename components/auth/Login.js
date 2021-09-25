import React, { Component } from 'react'
import { View, Button, TextInput, Image } from 'react-native'

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
        return (
            <View style = {styles.contentCenter}>
                <View style = {styles.loginPrompt}>
                <Image style = {styles.loginImage} source = {require("../../assets/icon.png")}/>
                    <View>
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="email"
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style = {styles.inputLabel}
                            placeholder="password"
                            secureTextEntry={ true }
                            onChangeText={password => this.setState({ password })}
                        />
                        <Button
                            onPress={() => this.onSignIn()}
                            title="Sign In"
                        />
                    </View>
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
    }
}