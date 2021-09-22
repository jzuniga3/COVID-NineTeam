import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'

import fire from '../fire'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    //TODO: process codes for errors and display to user
    onSignUp() {
        const { name, email, password } = this.state;
        fire.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            fire.firestore().collection("users")
            .doc(fire.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }


    render() {
        return (
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={ true }
                    onChangeText={password => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignUp()}
                    title="Register"
                />
            </View>
        )
    }
}
