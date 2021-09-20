import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'

const Tab = createMaterialBottomTabNavigator(); 

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount() {
       this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator initialRouteNam="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options= {{
                        tabBarIcon: ({focused, color, size}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} focused={true}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
                <Tab.Screen name="Add" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("AddContainer")
                        }
                    })}
                    options= {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options= {{
                        tabBarIcon: ({focused, color, size}) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} focused={true}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
            </Tab.Navigator>
        )
    }
}
// allows to freely access user's data within component
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);