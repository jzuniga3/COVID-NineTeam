import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, Button, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';

const handleLogout = () => 
{
    fire.auth().signOut()
    // location.reload(); 
}

export default function Profile()
{    
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [bmi, setBmi] = useState("");
    const [profilePic, setProfilePic] = useState(undefined);

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const updateProfile = () =>
    {
        usersDB.doc(userID).update(
        {
            name: name,
            age: age,
            feet: feet,
            inches: inches,
            weight: weight
        })
    }

    //Get user information from firestore
    const getUserInfo = () =>
    {
        usersDB.doc(userID).get().then((snapshot => 
        {
            setName(snapshot.data().name)
            setSex(snapshot.data().sex)
            setAge(snapshot.data().age)
            setWeight(snapshot.data().weight)
            setFeet(snapshot.data().feet)
            setInches(snapshot.data().inches)
            setBmi(snapshot.data().bmi)
            setProfilePic(snapshot.data().profilePicId)
        }))
    }

    getUserInfo();

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style = {styles.pageHeader}>Profile</Text>
            <View style = {styles.innerScreen}>

                <Image source={{ uri: profilePic }} style={styles.profilePicture}/>
                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Name:  </Text><TextInput 
                    style = {styles.profileInput}
                    placeholder = {name.toString()}
                    returnKeyType = 'done'
                    onChangeText = {newName => setName(newName)}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Age:  </Text><TextInput 
                    style = {styles.profileInput}
                    placeholder = { age.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newAge => setAge(newAge)}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Height:  </Text><TextInput 
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
                <Text style = {styles.profileData}>Weight:  </Text><TextInput 
                    style = {styles.weightInput}
                    placeholder = { weight.toString() }
                    returnKeyType = 'done'
                    onChangeText = {newWeight => setWeight(newWeight)}
                />
                <Text style = {styles.profileInput}> lbs</Text>
                </View>

                <Text style = {styles.profileData}>BMI: <Text style = {styles.profileInput}>{bmi.toString()}</Text></Text>
                <Text>{`\n\n`}</Text>

                <Button
                    style = {styles.profileButton}
                    title = 'Save changes'
                    onPress = {updateProfile}
                />
                <Button
                    style = {styles.profileButton}
                    onPress = {handleLogout}
                    title = 'Logout'
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
    innerScreen:
    {
        height: '80%',
        width: '80%',
        backgroundColor: "#FFFFFF"
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
        color: "#000000"
    },
    profilePicture:
    {
        marginLeft: 10,
        marginTop: 10,
        width: '180px',
        height: '180px'
    },
    profileData:
    {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: "#000000",
        marginLeft: 10
    },
    profileInput:
    {
        fontSize: 20,
        fontFamily: 'NunitoSans-Regular'
    },
    profileRow:
    {
        flexDirection: 'row',
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
    }
}