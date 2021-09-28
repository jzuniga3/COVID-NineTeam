import React, {useState} from 'react'
import fire from '../fire'
import {Text, View, Button, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const handleLogout = () => 
{
    fire.auth().signOut()
}

export default function Profile()
{    
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState(-1);
    const [weight, setWeight] = useState(-1);
    const [feet, setFeet] = useState(-1);
    const [inches, setInches] = useState(-1);

    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid
    
    let totalHeight = (feet*12) + inches*1;
    const BMI = (weight/(totalHeight*totalHeight)*703).toFixed(2);

    const onChangePasswordPress = () =>
    {
        usersDB.doc(userID).update({
            name: {name},
            age: {age},
            feet: {feet},
            inches: {inches},
            weight: {weight}
        })
    }

    //Get user information from firestore
    usersDB.doc(userID).get().then((doc) => {
        setName(doc.data().name)
        setSex(doc.data().sex)
        setAge(doc.data().age)
        setWeight(doc.data().weight)
        setFeet(doc.data().feet)
        setInches(doc.data().inches)
    })

    return (
        <SafeAreaView style = {styles.contentCenter}>
            <Text>Profile</Text>
            <View style = {styles.profileScreen}>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Name:  </Text><TextInput 
                    style = {styles.profileData}
                    placeholder = { name }
                    onChangeText = {newName => setName({newName})}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Age:  </Text><TextInput 
                    style = {styles.profileData}
                    placeholder = { age.toString }
                    onChangeText = {newAge => setAge({newAge})}
                />
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Height:  </Text><TextInput 
                    style = {styles.heightInput}
                    placeholder = { feet.toString }
                    onChangeText = {newFeet => setFeet({newFeet})}
                />
                <Text style = {styles.profileData}>'  </Text><TextInput 
                    style = {styles.heightInput}
                    placeholder = { inches.toString }
                    onChangeText = {newInches => setInches({newInches})}
                />
                <Text style = {styles.profileData}>"</Text>
                </View>

                <View style = {styles.profileRow}>
                <Text style = {styles.profileData}>Weight:  </Text><TextInput 
                    style = {styles.weightInput}
                    placeholder = { weight.toString }
                    onChangeText = {newWeight => setWeight({newWeight})}
                />
                <Text style = {styles.profileData}> lbs</Text>
                </View>

                <Text style = {styles.profileData}>BMI: {BMI}</Text>
                <Text>{`\n\n`}</Text>

                <Button
                    title = 'Save changes'
                    onPress = {onChangePasswordPress}
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