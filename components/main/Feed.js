import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Feed() {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor='blue' barStyle='light-content' />
            <Text>Feed</Text>
        </SafeAreaView>
    )
}
