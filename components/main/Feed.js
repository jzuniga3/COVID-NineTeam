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

   const calorieDB = fire.firestore().collection('calories')
   const usersDB = fire.firestore().collection('users')
   const userID = fire.auth().currentUser.uid

   const [name, setName] = useState("");
   const [sex, setSex] = useState("");
   const [age, setAge] = useState("");
   const [weight, setWeight] = useState("");
   const [feet, setFeet] = useState("");
   const [inches, setInches] = useState("");
   const [recommendedCalories, setRecommendedCalories] = useState("");
   const [gainCalories, setGainCalories] = useState("");
   const [loseCalories, setLoseCalories] = useState("");

   var totalHeight = ((feet * 12) + Number(inches));

   const updateFeed = () => 
   {
    calorieDB.doc(userID).update(
        {
            calories: dailyCalories,
            date: today
          
        })
   }
      
   usersDB.doc(userID).get().then((snapshot => 
    {
        setSex(snapshot.data().sex)
        setWeight(snapshot.data().weight)
        setFeet(snapshot.data().feet)
        setInches(snapshot.data().inches)
        setAge(snapshot.data().age)
    }))

//Recommended calories to maintain/gain/lose weight   

//BMR 
//Harris-Benedict Formula
const calculateCalories = () => 
{
    if (sex == "male") {
        
        setRecommendedCalories((66 + (6.3 * weight) + Number(12.9 * totalHeight) - (6.8 * age)));
         

    } else {
       
        setRecommendedCalories((65 + (4.3 * weight) + Number(4.7 * totalHeight) - (4.7 * age)));


    }
}


const calculateGainCalories = () =>
{
    setGainCalories(recommendedCalories + 500);

}


const calculateLoseCalories = () =>
{
    setLoseCalories(recommendedCalories - 500);

}

//************************* 
/*
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
      
*/   
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

                />
                </View>

                
                <Button
                    title = 'Save changes'
                    onPress = {updateFeed}
                />
                
                
                <Button
                    title = 'Calculate Recommended Calories to Maintain Weight'
                    onPress = {calculateCalories}
                />
                <Button
                    title = 'Calculate Recommended Calories to Gain Weight'
                    onPress = {calculateGainCalories}
                />
                <Button
                    title = 'Calculate Recommended Calories to Lose Weight'
                    onPress = {calculateLoseCalories}
                />



                <View style = {styles.feedRow}>
                <Text style = {styles.feedData}>Recommended Daily Caloric Intake to Maintain:  </Text><TextInput 
                    style = {styles.dateInput}
                    placeholder = { recommendedCalories.toString().substring(0,4)}
                    returnKeyType = 'done'
                />
                </View>

                <View style = {styles.feedRow}>
                <Text style = {styles.feedData}>Daily Caloric Intake to Gain:  </Text><TextInput 
                    style = {styles.dateInput}
                    placeholder = { gainCalories.toString().substring(0,4)}
                    returnKeyType = 'done'
                />
                </View>

                <View style = {styles.feedRow}>
                <Text style = {styles.feedData}>Daily Caloric Intake to Donate:  </Text><TextInput 
                    style = {styles.dateInput}
                    placeholder = { loseCalories.toString().substring(0,4)}
                    returnKeyType = 'done'
                />
                </View>

                
                
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
        fontSize: 20,
        width: 200
    }

}
