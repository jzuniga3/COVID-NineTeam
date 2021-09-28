import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'

import fire from '../fire'
import { Text, View, Button, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Feed() 
{
    //calorie log  
    ///** lookup how to take collections in firebase   make new collection under current user then start current collect. 
    // can a sub collection run under each user where they can enter their calories and it log (name,date,calories)
   const [dailyCalories, setDailyCalories] = useState("");
   var today = new Date();
   var logDate = today.toDateString(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

   var firstLoad = true;

   const storage = fire.storage().ref();

   const usersDB = fire.firestore().collection('calories')
   const userID = fire.auth().currentUser.uid


   const updateFeed = () => 
   {
    usersDB.doc(userID).update(
        {
            calories: dailyCalories,
            date: today
          
        })
   }
//************************* 
   const getUserInfo = () =>
    {
        usersDB.doc(userID).get().then((snapshot => 
        {
            setDailyCalories(snapshot.data().dailyCalories)
           // setlogDate(snapshot.data().logDate)

        }))
    }

    if(firstLoad == true)
    {
        getUserInfo();
        firstLoad = false;
    }
      
   
    return (
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text>Feed</Text>
            <View style = {styles.feedScreen}>



                <View style = {styles.feedRow}>
                <Text style = {styles.feedData}>Daily Calories:  </Text><TextInput 
                    style = {styles.calorieInput}
                    placeholder = { dailyCalories }
                    returnKeyType = 'done'
                    onChangeText = {newdailyCalories => setDailyCalories(newdailyCalories)}
                />
                </View>

                <View style = {styles.feedRow}>
                <Text style = {styles.feedData}>Date:  </Text><TextInput 
                    style = {styles.dateInput}
                    placeholder = { logDate.toString() }
                   // returnKeyType = 'done'
                   // onChangeText = {newlogDate => setFeet(newlogDate)}
                />
                </View>

                
                <Button
                    title = 'Save changes'
                    onPress = {updateFeed}
                />
                
            </View>
        </SafeAreaView>
    );
}   

const styles =
{
    contentCenter:
    {
        height: '100%',
        backgroundColor: "#192879",
        alignItems: 'center'
    },
    feedScreen:
    {
        height: '80%',
        width: '80%',
        backgroundColor: "#FFFFFF"
    },
    feedData:
    {
        fontSize: 20,
    },
    feedRow:
    {
        flexDirection: 'row',
    },
    calorieInput:
    {
        fontSize: 20,
        width: 50
    },
    dateInput:
    {
        fontsize: 20,
        width: 200
    }

}
