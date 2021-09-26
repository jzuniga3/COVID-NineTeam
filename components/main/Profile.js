import React, {useState} from 'react'
import fire from '../fire'
import {Text, View, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const handleLogout = () => 
{
    fire.auth().signOut()
}

//editProfile = (profile) => 
//{
//    return this.db
//        .collection("users")
//        .doc(this.auth.currentUser.uid)
//        .set(profile)
//        .catch((error) => console.error("Error: ", error));
//}


export default function Profile()
{    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState(-1);
    const [weight, setWeight] = useState(-1);
    const [feet, setFeet] = useState(-1);
    const [inches, setInches] = useState(-1);

    //Get user information from firestore
    fire.firestore().collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            setName(doc.data().name)
            setEmail(doc.data().email)
            setSex(doc.data().sex)
            setAge(doc.data().age)
            setWeight(doc.data().weight)
            setFeet(doc.data().feet)
            setInches(doc.data().inches)
        })
    })

    let totalHeight = (feet*12) + inches*1;
    const BMI = (weight/(totalHeight*totalHeight)*703).toFixed(2);

    return (
        <SafeAreaView style = {styles.contentCenter}>
            <Text>Profile</Text>
            <View style = {styles.profileScreen}>

                <Text>Name: {name}</Text>
                <Text>Email: {email}</Text>
                <Text>Age: {age}</Text>
                <Text>Sex: {sex}</Text>
                <Text>Height: {feet}' {inches}"</Text>
                <Text>Weight: {weight} lbs</Text>
                <Text>{`\n`}</Text>
                <Text>BMI: {BMI}</Text>
                <Text>{`\n\n`}</Text>

                <TouchableOpacity onPress = {handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
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
    }
}