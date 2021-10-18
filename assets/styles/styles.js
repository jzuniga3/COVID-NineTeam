import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    loginPrompt:
    {
        marginTop: 30,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 70
    },
    loginImage:
    {
        width: 250,
        height: 250,
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    inputLabel:
    {
        width: 280,
        height: 45,
        borderColor: "#43519D",
        backgroundColor: "#FFFFFF"
    },
    userLabel:
    {
        fontSize: 20,
        color: "#414E93"
    },
    contentCenter:
    {
        height: '100%',
        backgroundColor: "#192879",
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    logo: {
        width: 163,
        height: 161,
        paddingTop: '5%'
    },
    headerText: {
        fontSize: 22,
        color: '#FFF',
        fontFamily: 'NunitoSans-Bold',
        paddingHorizontal: 51,
        marginBottom: 7
    },
    footerText: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginRight: 37,
    },
    textBold: {
        color: '#FFF',
        fontFamily: 'NunitoSans-Bold',
        fontSize: 14
    },
    textRegular: {
        color: '#FFF',
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14

    },
    textRegularHeading: {
        color: '#FFF',
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        marginLeft: '4%',
        marginBottom: '1%'
    },
    RegisterButton: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: '35%',
        marginTop: '32%'
    },
    LoginButton: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: '53%',
        marginLeft: '45%'
        
    },
    ios: {
        height: '100%', 
        width: '100%' 
    },
    containerSmall: {
        backgroundColor: '#FFF',
        height: 70,
        width: '200%',
        marginLeft: '7%',
        marginBottom: '4%',
        borderRadius: 24,
    },
    AuthTextInputContainer: {
        backgroundColor: '#FFF',
        height: 70,
        width: '85%',
        marginLeft: '7%',
        marginBottom: '4%',
        borderRadius: 24,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowColor: '#000',
        elevation: 11
    },
    AuthTextInputText: {
        marginLeft: '8%',
        fontSize: 14,
        marginTop: '3%',
        fontFamily: 'Montserrat-SemiBold',
        color: '#12121F'
    },
    AuthTextInputTextInput: {
        marginLeft: '8%',
        marginTop: Platform.OS === "ios"? "3%" : 0,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15
    },
    AuthTextInputContainerSmall: {
        backgroundColor: '#FFF',
        height: 50,
        width: '47%',
        marginBottom: '6%',
        marginRight: '4%',
        borderRadius: 20,
        elevation: 11
    },
    AuthTextInputRow: {
        flex: 1,
        flexDirection: 'row',
    },
    DefaultProfile: {
        width: 110,
        height: 110,
        borderRadius: 90,
        paddingTop: '5%'
    }
})

export default styles;