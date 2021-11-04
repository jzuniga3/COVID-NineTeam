import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, Button, Image, Modal, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';

export default function Food()
{    
    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const [dailyFood, setDailyFood] = useState("");
    const [userDataIsRetrieved, setUserDataIsRetrieved] = useState(false);
    let newDailyFood = {};

    function addSteak()
    {
        newDailyFood = dailyFood;
        let id = Object.keys(dailyFood).length + 1;
        newDailyFood[id] = {name: "Steak", calories: 500};
        updateProfile();
    }

    function addCoke()
    {
        newDailyFood = dailyFood;
        let id = Object.keys(dailyFood).length + 1;
        newDailyFood[id] = {name: "Coke", calories: 200};
        updateProfile();
    }

    function addPotato()
    {
        newDailyFood = dailyFood;
        let id = Object.keys(dailyFood).length + 1;
        newDailyFood[id] = {name: "Potato", calories: 100};
        updateProfile();
    }

    function updateProfile()
    {
        usersDB.doc(userID).update({
            daily_food: newDailyFood
            })
        
        setUserDataIsRetrieved(false);
    }

    //Get user information from firestore
    const getUserInfo = () =>
    {
        usersDB.doc(userID).get().then((snapshot => 
        {
            setDailyFood(snapshot.data().daily_food);
        }))

        setUserDataIsRetrieved(true);
    }

    if (userDataIsRetrieved == false)
    {
        getUserInfo();
    }

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style = {styles.pageHeader}>Food</Text>
            <View style = {styles.innerScreen}>
                <Button title = "Add steak" onPress = {() => addSteak()}/>
                <Button title = "Add coke" onPress = {() => addCoke()}/>
                <Button title = "Add potato" onPress = {() => addPotato()}/>
                <Button title = "Submit" onPress = {() => updateProfile()}/>
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
}   

const styles =
{
    name:
    {
        fontSize: 23,
        fontFamily: 'NunitoSans-Bold',
        marginLeft: 10
    },
    purposeText:
    {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 18,
        marginLeft: 10
    },
    profilePicture:
    {
        marginLeft: 10,
        marginTop: 10,
        width: 180,
        height: 180,
        borderRadius: 100,
    },
    outerScreen: 
    {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    pageHeader:
    {
        fontSize: 30,
        fontFamily: 'NunitoSans-Bold',
        color: '#000000'
    },
    contentCenter:
    {
        height: '100%',
        alignItems: 'center'
    },
    innerScreen:
    {
        height: '95%',
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderRadius: 0
    },
    profileData:
    {
        borderWidth: 0.25,
        borderColor: "#D3D3D3",
        alignItems: 'center'
    },
    center: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalBody: 
    {
        backgroundColor: '#F8F8FF',
        borderRadius: 10,
        width: '100%',
        height: '40%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: 
        {
          width: 20,
          height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 40
    },
    xbutton:
    {
        marginTop: 10,
        marginLeft: 290,
        fontSize: 30,
        opacity: 0.3
    }
}