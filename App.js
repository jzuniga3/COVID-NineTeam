import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import fire from './components/fire';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save'

// Stack to handle navigation
const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  // check whether user is logged in
  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;

    // if not loaded display loading screen
    if(!loaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )
    }

    // if not logged in display navigation container
    if(!loggedIn) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerBackTitle: "Back" }}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
    }

    return(
      // must be inside provider to allow redux to work
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="AddContainer" component={AddScreen} navigation={this.props.navigation} options={{ headerBackTitle: "Back" }}/>
            <Stack.Screen name="Save" component={SaveScreen} options={{ headerBackTitle: "Back" }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    
    )
  }
}
