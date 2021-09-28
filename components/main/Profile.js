import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, Button, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const handleLogout = () => 
{
    fire.auth().signOut()
}

var firstLoad = true;

export default function Profile()
{    
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    
    const [profilePic, setProfilePic] = useState(undefined);
    const storage = fire.storage().ref();

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid
    
    let totalHeight = (feet*12) + inches*1;
    const BMI = (weight/(totalHeight*totalHeight)*703).toFixed(2);

    var childPath = `image/${fire.auth().currentUser.uid}/profilePicture.jpeg`;

    if(childPath != undefined) 
    {
        storage.child(childPath).getDownloadURL().then((url) => {
            setProfilePic(url);
            console.log(url);
        })
    } 
    else 
    {
        console.log('child path is not defined...')
    }

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
            <Text>Profile</Text>
            <View style = {styles.profileScreen}>

                <Image source={{ uri: profilePic }} style={{width: '50%', height: '50%'}}/>
                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Name:  </Text><TextInput 
                    style = {styles.profileData}
                    placeholder = {name.toString()}
                    returnKeyType = 'done'
                    onChangeText = {newName => setName(newName)}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Age:  </Text><TextInput 
                    style = {styles.profileData}
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
                <Text style = {styles.profileData}> lbs</Text>
                </View>

                <Text style = {styles.profileData}>BMI: {BMI}</Text>
                <Text>{`\n\n`}</Text>

                <Button
                    title = 'Save changes'
                    onPress = {updateProfile}
                />
                <Button
                    onPress = {handleLogout}
                    title = 'Logout'
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
    profileScreen:
    {
        height: '80%',
        width: '80%',
        backgroundColor: "#FFFFFF"
    },
    profileData:
    {
        fontSize: 20,
    },
    profileRow:
    {
        flexDirection: 'row',
    },
    heightInput:
    {
        fontSize: 20,
        width: 25
    },
    weightInput:
    {
        fontSize: 20,
        width: 40
    }
}