import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Userlist()
{    
    const [userList, setUserList] = useState(null);
    //const storage = fire.storage().ref();
    const usersDB = fire.firestore().collection('users')

    //var childPath = `image/${fire.auth().currentUser.uid}/profilePicture.jpeg`;

    /* if(childPath != undefined) 
    {
        storage.child(childPath).getDownloadURL().then((url) => {
            setProfilePic(url);
            console.log(url);
        })
    } 
    else 
    {
        console.log('child path is not defined...')
    } */

    //Get user information from firestore
    const getUsers = () =>
    {
        usersDB.get().then(function(querySnapshot) 
        {
            let userData = querySnapshot.docs.map(doc => doc.data())
            setUserList(userData)
        }).catch(function(error) {console.log('Error getting documents: ', error)})
    }
      
    getUsers();
    //alertUserList();

    return (
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style = {{color: '#FFFFFF'}}>List of Users</Text>
            <View style = {styles.profileScreen}>
                <FlatList
                    data={userList}
                    renderItem={({item}) => <Text>{item.name} - I want to {item.purpose} weight!</Text>}
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