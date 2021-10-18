import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';

export default function Userlist()
{    
    const [userList, setUserList] = useState(null);
    const usersDB = fire.firestore().collection('users')
    const [userDataIsRetrieved, setUserDataIsRetrieved] = useState(false);

    //Get user information from firestore
    const getUsers = () =>
    {
        usersDB.get().then(function(querySnapshot) 
        {
            let userData = querySnapshot.docs.map(doc => doc.data())
            setUserList(userData)
        }).catch(function(error) {console.log('Error getting documents: ', error)})

        setUserDataIsRetrieved(true);
    }

    if (userDataIsRetrieved == false)
    {
        getUsers();
    }

    return (
        <LinearGradient colors={[colors.lightBlue, colors.darkBlue]} style={styles.outerScreen}>
        <SafeAreaView style = {styles.contentCenter}>
            <StatusBar barStyle='light-content' />
            <Text style = {styles.pageHeader}>List of Users</Text>
            <View style = {styles.innerScreen}>
                {userList != null &&
                    <FlatList
                    data={userList}
                    renderItem={({item}) => 
                        <View style = {styles.profileData}>
                            <Image source={{uri: item.profilePicId}} style={styles.profilePicture}/>
                            <Text style= {styles.name}>{item.name}</Text>
                            <Text style = {styles.purposeText}>I want to {item.purpose} weight!{'\n'}</Text>
                        </View>}
                    />
                }
          </View>
        </SafeAreaView>
        </LinearGradient>
    );
}   

const styles =
{
    name:
    {
        fontSize: 23,
        fontFamily: 'NunitoSans-Bold',
        marginLeft: 10
    },
    purposeText:
    {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 18,
        marginLeft: 10
    },
    profilePicture:
    {
        marginLeft: 10,
        marginTop: 10,
        width: 180,
        height: 180
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
    profileData:
    {
        borderWidth: 0.25,
        borderColor: "#D3D3D3"
    },
}