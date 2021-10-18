import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import fire from '../fire'
import { Text, View, FlatList, Image, Modal, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors/colors';

export default function Userlist()
{    
    const [userList, setUserList] = useState(null);
    const usersDB = fire.firestore().collection('users');
    const [userDataIsRetrieved, setUserDataIsRetrieved] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupItem, setPopupItem] = useState(null);

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

    const togglePopup = (item) =>
    {
        setPopupOpen(!popupOpen)

        if (item != null)
        {
            setPopupItem(item);
        }
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
                            <TouchableOpacity onPress = {() => togglePopup(item)}>
                                <Image source={{uri: item.profilePicId}} style={styles.profilePicture}/>
                                <View style={{ alignItems: 'center'}}>
                                    <Text style= {styles.name}>{item.first_name + " " + item.last_name}</Text>
                                    <Text style = {styles.purposeText}>I want to {item.purpose} weight!{'\n'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                    />
                }

                {popupItem != null &&
                <Modal animationType = 'none' visible = {popupOpen} transparent = {true}>
                    <View style = {styles.center}>
                        <View style = {styles.modalBody}>
                            <TouchableOpacity onPress = {() => togglePopup(null)}>
                                <Text style = {styles.xbutton}>X</Text>
                            </TouchableOpacity>
                            <Text>{popupItem.first_name}</Text>
                            <Text>{popupItem.sex}</Text>
                            <Text>{popupItem.feet}' {popupItem.inches}"</Text>
                            <Text>{popupItem.weight}lbs</Text>
                            <Text>{popupItem.bmi}</Text>
                        </View>
                    </View>
                </Modal>}
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
        height: 180,
        borderRadius: 100,
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
    contentCenter:
    {
        height: '100%',
        alignItems: 'center'
    },
    innerScreen:
    {
        height: '95%',
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderRadius: 0
    },
    profileData:
    {
        borderWidth: 0.25,
        borderColor: "#D3D3D3",
        alignItems: 'center'
    },
    center: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalBody: 
    {
        backgroundColor: '#F8F8FF',
        borderRadius: 10,
        width: '100%',
        height: '40%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: 
        {
          width: 20,
          height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 40
    },
    xbutton:
    {
        marginTop: 10,
        marginLeft: 290,
        fontSize: 30,
        opacity: 0.3
    }
}