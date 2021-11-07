import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'

import fire from '../fire'
import { Text, View, Button, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../assets/colors/colors'

export default function Feed() 
{
    //calorie log  
    ///** lookup how to take collections in firebase   make new collection under current user then start current collect. 
    // can a sub collection run under each user where they can enter their calories and it log (name,date,calories)
    let today = new Date();
    let logDate = today.toDateString(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dailyFood, setDailyFood] = useState(null);
    const [splitDailyFood, setSplitDailyFood] = useState(null);
    let totalHeight = ((feet * 12) + Number(inches));

    const [recommendedCalories, setRecommendedCalories] = useState("");
    const [purposeCalories, setPurposeCalories] = useState("");
    const [dailyCalories, setDailyCalories] = useState(0);
    const [startIndex, setStartIndex] = useState(5);
    const [endIndex, setEndIndex] = useState(10);

    const [userDataIsRetrieved, setUserDataIsRetrieved] = useState(false);
    let newDailyFood = undefined;
    let newFoodName = "";
    let newFoodCalories = "";
    

    function updateFeed()
    {
        usersDB.doc(userID).collection("DailyFood").add(newDailyFood)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Error', error.message, [{text: 'OK'},], {cancelable: true});
        });
     
        setUserDataIsRetrieved(false);
    }
      
    const getUserInfo = () =>
    {
        usersDB.doc(userID).get().then((snapshot => 
            {
                setSex(snapshot.data().sex);
                setWeight(snapshot.data().weight);
                setFeet(snapshot.data().feet);
                setInches(snapshot.data().inches);
                setAge(snapshot.data().age);
                setPurpose(snapshot.data().purpose);

                calculateCalories();
            }))
        
        usersDB.doc(userID).collection("DailyFood").get().then(function(querySnapshot)
            {
                let dailyFoodData = querySnapshot.docs.map(doc => doc.data())
                setDailyFood(dailyFoodData);
                setSplitDailyFood(dailyFoodData.slice(0, 5))

                setUserDataIsRetrieved(true);

                changeDailyCalories();

            }).catch(function(error) {console.log('Error getting documents: ', error)})
    }

    function validateFoodInputs(name, calories)
    {
        let errorMsg = 'Invalid fields:';
        let isError = false;

        if (name == "")
        {
            errorMsg += '\nName';
            isError = true;
        }

        if (calories == "" || calories < 0)
        {
            errorMsg += '\nCalories';
            isError = true;
        }

        //If an error was detected.
        if (isError == true)
        {
            alert(errorMsg);
            isError = false;
        }
        //If everything is valid
        else
        {
            typeNewFood(name, calories);
        }
    }

    function typeNewFood(name, calories)
    {
        newDailyFood = {name: name, calories: calories};
        // let id = Object.keys(newDailyFood).length + 1;
        // newDailyFood[id] = {name: name, calories: calories};
        updateFeed();
        alert("You added: " + name);

        changeDailyCalories();
    }

    function changeDailyCalories()
    {
        let currentCals = 0;

        if (dailyFood != null)
        {
            for (let i = 0; i < dailyFood.length; i++)
            {
                currentCals += parseFloat(dailyFood[i].calories);
            }
        }

        setDailyCalories(currentCals);
    }

    //Recommended calories to maintain weight   
    //BMR 
    //Harris-Benedict Formula
    function calculateCalories()
    {
        let calories = "";

        if (sex == "male") 
        {
            calories = (66 + (6.3 * weight) + Number(12.9 * totalHeight) - (6.8 * age));
            setRecommendedCalories(calories);
        } 
        else 
        {
            calories = (65 + (4.3 * weight) + Number(4.7 * totalHeight) - (4.7 * age))
            setRecommendedCalories(calories);
        }

        calculatePurposeCalories(calories);
    }

    const continueList = (start, end) =>
    {
        setSplitDailyFood(splitDailyFood.concat(dailyFood.slice(start, end)));
        setStartIndex(startIndex + 5);
        setEndIndex(endIndex + 5);
    }

    //calculates calories needed to gain or lose weight depending on user's purpose
    function calculatePurposeCalories(calories)
    {
        if (purpose == "donate")
        {
            setPurposeCalories(calories - 500);
        }
        else
        {
            setPurposeCalories(calories + 500);
        }   
    }

    if (userDataIsRetrieved == false)
    {
        getUserInfo();
    }

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.pageHeader}>Feed</Text>
            <View style = {styles.feedScreen}>

                <View style = {styles.feedRow}>
                    <Text style = {styles.feedData}>Your purpose is to {purpose} weight</Text>
                </View>

                <View style = {styles.feedRow}>
                    <Text style = {styles.feedData}>Date: {logDate.toString()}</Text>
                </View>

                <View style = {styles.feedRow}>
                    <Text style = {styles.feedData}>Daily Calories to maintain weight: {Math.round(recommendedCalories)} Cal</Text>
                </View>

                <View style = {styles.feedRow}>
                    <Text style = {styles.feedData}>Daily Calories to {purpose} 1 lb: {Math.round(purposeCalories)} Cal</Text>
                </View>

                <View style = {styles.feedRow}>
                    <Text style = {styles.feedData}>Current Daily Calories: {dailyCalories} Cal</Text>
                </View>

                <View style = {styles.feedRow}>
                    <TextInput 
                        style = {styles.nameInput}
                        placeholder = "Name of food"
                        returnKeyType = 'done'
                        onChangeText = {editedFoodName => newFoodName = editedFoodName}
                    />
                    <TextInput 
                        style = {styles.calorieInput}
                        placeholder = "Cals"
                        returnKeyType = 'done'
                        onChangeText = {editedFoodCalories => newFoodCalories = editedFoodCalories}
                    />
                    <Button
                        title = 'Add Food'
                        onPress = {() => validateFoodInputs(newFoodName, newFoodCalories)}
                    />
                </View>
                <FlatList
                    data={dailyFood}
                    renderItem={({item}) => 
                        <View style = {styles.foodData}>
                            <TouchableOpacity onPress = {() => togglePopup(item)}>
                                <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                                    <Text style= {styles.foodName}>{item.name}{" "}</Text>
                                    <Text style = {styles.foodCalories}>{item.calories}{'\n'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                    onEndReached = {() => continueList(startIndex, endIndex)}
                    onEndReachedThreshold = {1}
                    />

            </View>
        </SafeAreaView>
        </LinearGradient>
    );
}   

const styles =
{
    contentCenter:
    {
        height: '100%',
        alignItems: 'center'
    },
    feedScreen:
    {
        height: '100%',
        width: '100%',
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
    nameInput:
    {
        fontSize: 20,
        width: 200
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
    foodData: 
    {

    },
    foodName:
    {

    },
    foodCalories:
    {

    }

}
