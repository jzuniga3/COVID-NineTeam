import { StyleSheet, Platform } from "react-native";

const profileStyles = StyleSheet.create({
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
        elevation: 12
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
        marginBottom: '20%',
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    profileData:
    {
        fontSize: 17,
        fontFamily: 'Montserrat-SemiBold',
        color: "#000000",
        marginLeft: '10%',
        marginBottom: 7
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
    profileButton: {
        height: 10,
        width: 10
    }
})


export default profileStyles;