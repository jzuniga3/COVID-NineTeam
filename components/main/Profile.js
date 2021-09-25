import React from 'react'
import fire from '../fire'
import {Text, View, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const handleLogout = () => {
    fire.auth().signOut()
}

export default function Profile() {
    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <View>
                <TouchableOpacity onPress = {handleLogout}>
                <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
