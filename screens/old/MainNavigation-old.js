import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../components/BarcodeScreen';
import SettingsScreen from '../SettingsScreen';
import ProfileScreen from "../ProfileScreen";



const Tab = createBottomTabNavigator();

const MainNavigation =()=>{

    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />

                <Tab.Screen name="Settings" component={SettingsScreen} />

                <Tab.Screen name={"Profile"} component={ProfileScreen} />


            </Tab.Navigator>
        </NavigationContainer>

    )
}


export default MainNavigation;
