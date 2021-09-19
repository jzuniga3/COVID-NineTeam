import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase'

import LandingScreen from './auth/Landing'
import RegisterScreen from './auth/Register';

const firebaseConfig = {
  apiKey: "AIzaSyBn-HXdCwAxePnognFZ9-4nWpNrJYYfCG8",
  authDomain: "weightexchangeapp.firebaseapp.com",
  databaseURL: "https://weightexchangeapp-default-rtdb.firebaseio.com",
  projectId: "weightexchangeapp",
  storageBucket: "weightexchangeapp.appspot.com",
  messagingSenderId: "1086264875488",
  appId: "1:1086264875488:web:758ac029a2426b092eb385",
  measurementId: "G-ZT4PY1KNGK"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}