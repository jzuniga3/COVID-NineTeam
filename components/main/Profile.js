import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, Button, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@react-navigation/material-bottom-tabs'
import colors from '../../assets/colors/colors';
import profileStyles from '../../assets/styles/profileStyles'

const handleLogout = () => 
{
    fire.auth().signOut();
}

export default function Profile()
{    
    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [bmi, setBmi] = useState("");
    const [profilePic, setProfilePic] = useState(undefined);
    const [userDataIsRetrieved, setUserDataIsRetrieved] = useState(false);
    const [purpose, setPurpose] = useState("");

    //for profile editing. hooks update too slowly.
    let newFirstName = firstName;
    let newLastName = lastName;
    let newAge = age;
    let newWeight = weight;
    let newFeet = feet;
    let newInches = inches;

    function validateProfileEdits()
    {
        if (userDataIsRetrieved)
        {
            let errorMsg = 'Invalid fields:';
            let isError = false;

            //Check if name is empty
            if (newFirstName == '' || newLastName =='')
            {
                errorMsg += '\nName';
                isError = true;
            }
            //Check if age is valid
            if (newAge == '' || isNaN(newAge) || newAge < 1 || newAge > 120)
            {
                errorMsg += '\nAge';
                isError = true;
            }
            //Check if height is valid
            if (newInches == '' || isNaN(newInches) || newInches < 0 || newInches > 11 || newFeet == '' || isNaN(newFeet) || newFeet < 0 || newFeet > 10)
            {
                errorMsg += '\nHeight';
                isError = true;
            }
            //Check if weight is valid
            if (newWeight == '' || isNaN(newWeight) || newWeight < 0 || newWeight > 1500)
            {
                errorMsg += '\nWeight';
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
                updateProfile();
            }
        }
    }

    const updateProfile = () =>
    {
        usersDB.doc(userID).update({
            first_name: newFirstName,
            last_name: newLastName,
            age: newAge,
            feet: newFeet,
            inches: newInches,
            weight: newWeight,
            bmi: calcBMI()
            })

        setUserDataIsRetrieved(false);
    }

    const calcBMI = () =>
    {
        let totalHeight = (feet * 12) + inches;

        return (((weight / (totalHeight * totalHeight)) * 703)*100).toFixed(2)
    }

    //Get user information from firestore
    const getUserInfo = () =>
    {
        usersDB.doc(userID).get().then((snapshot => 
        {
            setFirstName(snapshot.data().first_name)
            setLastName(snapshot.data().last_name)
            setSex(snapshot.data().sex)
            setAge(snapshot.data().age)
            setWeight(snapshot.data().weight)
            setFeet(snapshot.data().feet)
            setInches(snapshot.data().inches)
            setBmi(snapshot.data().bmi)
            setProfilePic(snapshot.data().profilePicId)
            setPurpose(snapshot.data().purpose)
        }))

        setUserDataIsRetrieved(true);
    }

    if (userDataIsRetrieved == false)
    {
        getUserInfo();
    }

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={profileStyles.outerScreen}>
        <SafeAreaView style = {profileStyles.contentCenter}>
            <View style = {profileStyles.innerScreen}>

                <View style={{ alignItems: 'center'}}>
                    <Text style = {profileStyles.pageHeader}>Profile</Text>
                    <Image source={{ uri: profilePic }} style={profileStyles.profilePicture}/>
                </View>
                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Name  </Text><TextInput 
                    style = {profileStyles.profileInput}
                    placeholder = {firstName.toString() + " "}
                    returnKeyType = 'done'
                    onChangeText = {editedFirstName => newFirstName = editedFirstName}
                />
                <TextInput 
                    style = {profileStyles.profileInput}
                    placeholder = {lastName.toString()}
                    returnKeyType = 'done'
                    onChangeText = {editedLastName => newLastName = editedLastName}
                />
                </View>

                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Age  </Text><TextInput 
                    style = {profileStyles.profileInput}
                    placeholder = { age.toString() }
                    returnKeyType = 'done'
                    onChangeText = {editedAge => newAge = editedAge}
                />
                </View>

                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Height  </Text><TextInput 
                    style = {profileStyles.heightInput}
                    placeholder = { feet.toString() }
                    returnKeyType = 'done'
                    onChangeText = {editedFeet => newFeet = editedFeet}
                />
                <Text style = {{fontSize: 17, fontFamily: 'Montserrat-SemiBold', color: "#000000",}}>'  </Text>
                <TextInput 
                    style = {profileStyles.heightInput}
                    placeholder = { inches.toString() }
                    returnKeyType = 'done'
                    onChangeText = {editedInches => newInches = editedInches}
                />
                <Text style = {{fontSize: 17, fontFamily: 'Montserrat-SemiBold', color: "#000000",}}>"</Text>
                </View>

                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Weight  </Text><TextInput 
                    style = {profileStyles.weightInput}
                    placeholder = { weight.toString() }
                    returnKeyType = 'done'
                    onChangeText = {editedWeight => newWeight = editedWeight}
                />
                <Text style = {profileStyles.profileInput}> lbs</Text>
                </View>
                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>BMI </Text><Text style = {profileStyles.profileInput}>{bmi.toString()}</Text>
                <Text>{`\n\n`}</Text>
                </View>
                <View style = {{flexDirection: 'row', marginLeft: 50, marginBottom: 25}}>
                <Text style = {profileStyles.profileData}>{"I want to " + purpose.toString() + " weight!"} </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                    style = {profileStyles.profileButton}
                    title = 'Save changes'
                    onPress = {() => validateProfileEdits()}
                />
                <Button
                    style = {profileStyles.profileButton}
                    onPress = {handleLogout}
                    title = 'Logout'
                />
                </View>
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
}   

