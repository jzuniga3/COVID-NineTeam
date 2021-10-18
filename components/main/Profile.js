import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, Button, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@react-navigation/material-bottom-tabs'
import colors from '../../assets/colors/colors';

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
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <View style = {styles.innerScreen}>

                <View style={{ flex: 1, alignItems: 'center'}}>
                    <Text style = {styles.pageHeader}>Profile</Text>
                    <Image source={{ uri: profilePic }} style={styles.profilePicture}/>
                </View>
                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Name  </Text><TextInput 
                    style = {styles.profileInput}
                    placeholder = {firstName.toString() + " "}
                    returnKeyType = 'done'
                    onChangeText = {newFirstName => setFirstName(newFirstName)}
                />
                <TextInput 
                    style = {styles.profileInput}
                    placeholder = {lastName.toString()}
                    returnKeyType = 'done'
                    onChangeText = {newLastName => setLastName(newLastName)}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Age  </Text><TextInput 
                    style = {styles.profileInput}
                    placeholder = { age.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newAge => setAge(newAge)}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Height  </Text><TextInput 
                    style = {styles.heightInput}
                    placeholder = { feet.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newFeet => setFeet(newFeet)}
                />
                <Text style = {styles.profileData}>'  </Text><TextInput 
                    style = {styles.heightInput}
                    placeholder = { inches.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newInches => setInches(newInches)}
                />
                <Text style = {styles.profileData}>"</Text>
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Weight  </Text><TextInput 
                    style = {styles.weightInput}
                    placeholder = { weight.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newWeight => setWeight(newWeight)}
                />
                <Text style = {styles.profileInput}> lbs</Text>
                </View>

                <Text style = {styles.profileData}>BMI <Text style = {styles.profileInput}>{bmi.toString()}</Text></Text>
                <Text>{`\n\n`}</Text>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Purpose {purpose.toString() + " weight"} </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row'}}>
                <Button
                    style = {styles.profileButton}
                    title = 'Save changes'
                    onPress = {updateProfile}
                />
                {/* <MaterialCommunityIcons name="account-circle" color={colors.darkBlue} size={26}/> */}
                <Button
                    style = {styles.profileButton}
                    onPress = {handleLogout}
                    title = 'Logout'
                />
                </View>
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
    innerScreen:
    {
        height: '93%',
        width: '100%',
        backgroundColor: "#FFFFFF",
        marginTop: '12%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 80,
        shadowColor: '#000',
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
        fontSize: 24,
        fontFamily: 'Montserrat-SemiBold',
        color: "#000000",
        marginTop: 14
    },
    profilePicture:
    {
        marginLeft: 10,
        marginTop: '4%',
        width: 200,
        height: 200,
        borderRadius: 100
    },
    profileData:
    {
        fontSize: 17,
        fontFamily: 'Montserrat-SemiBold',
        color: "#000000",
        marginLeft: '10%',
    },
    profileInput:
    {
        fontSize: 20,
        fontFamily: 'NunitoSans-Regular',
        marginRight: 0
    },
    profileRow:
    {
        flexDirection: 'row',
        marginLeft: 10,
    },
    heightInput:
    {
        fontSize: 20,
        fontFamily: 'NunitoSans-Regular',
        width: 25
    },
    weightInput:
    {
        fontSize: 20,
        fontFamily: 'NunitoSans-Regular',
        width: 40
    },
}