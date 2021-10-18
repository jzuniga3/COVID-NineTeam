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
    fire.auth().signOut()
    // location.reload(); 
}

export default function Profile()
{    
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

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const updateProfile = () =>
    {
        usersDB.doc(userID).update(
        {
            first_name: firstName,
            last_name: lastName,
            age: age,
            feet: feet,
            inches: inches,
            weight: weight,
            purpose: purpose
        })

        setUserDataIsRetrieved(false);
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
                    onChangeText = {newFirstName => setFirstName(newFirstName)}
                />
                <TextInput 
                    style = {profileStyles.profileInput}
                    placeholder = {lastName.toString()}
                    returnKeyType = 'done'
                    onChangeText = {newLastName => setLastName(newLastName)}
                />
                </View>

                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Age  </Text><TextInput 
                    style = {profileStyles.profileInput}
                    placeholder = { age.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newAge => setAge(newAge)}
                />
                </View>

                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Height  </Text><TextInput 
                    style = {profileStyles.heightInput}
                    placeholder = { feet.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newFeet => setFeet(newFeet)}
                />
                <Text style = {{fontSize: 17, fontFamily: 'Montserrat-SemiBold', color: "#000000",}}>'  </Text>
                <TextInput 
                    style = {profileStyles.heightInput}
                    placeholder = { inches.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newInches => setInches(newInches)}
                />
                <Text style = {{fontSize: 17, fontFamily: 'Montserrat-SemiBold', color: "#000000",}}>"</Text>
                </View>

                <View style = {profileStyles.profileRow}>
                <Text style = {profileStyles.profileData}>Weight  </Text><TextInput 
                    style = {profileStyles.weightInput}
                    placeholder = { weight.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newWeight => setWeight(newWeight)}
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
                    onPress = {updateProfile}
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

