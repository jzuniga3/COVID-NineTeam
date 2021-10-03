import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';


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
import Test from './screens/TestScreen';

import * as Font from 'expo-font'

// Stack to handle navigation
const Stack = createStackNavigator();

// custom fonts
let customFonts = {
  'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
  'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
};
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      fontsLoaded: false,
    }
    LogBox.ignoreLogs(['Setting a timer']);
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  // check whether user is logged in
  componentDidMount() {
    this._loadFontsAsync();
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
    if(!loaded || !this.state.fontsLoaded) {
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
      <Stack.Navigator initialRouteName="Register">
        {/* <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/> */}
        <Stack.Screen name="Register" component={RegisterScreen} navigation={this.props.navigation} options={{  headerShown: false }}/>
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
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} options={{ headerBackTitle: "Back" }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    
    )
  }
}
