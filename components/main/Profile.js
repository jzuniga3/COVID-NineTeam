import React from 'react'
import fire from '../fire'
import {Text, View, TouchableOpacity} from 'react-native'

const handleLogout = () => {
    fire.auth().signOut()
}

export default function Profile() {
    return (
        <View>
            <Text>Profile</Text>
            <View>
                <TouchableOpacity onPress = {handleLogout}>
                <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
