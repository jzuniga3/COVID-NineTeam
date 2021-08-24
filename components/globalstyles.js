import {StyleSheet,Dimensions} from "react-native";

const { width } = Dimensions.get('screen');

//universal stylesheet for application, may be imported to provide default style to certain objects
export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#05a6f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:40,
        color:"#ffffff",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#ffffff",
        borderRadius:25,
        height:60,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"100%",
        backgroundColor:"#af9cff",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:30
    },
    loginText:{
        color:"white"
    },
    errMsg:{
        color: 'red'
    },
    errMsgBody:{
        paddingBottom:15,
    },
    switchToLoginOrRegister:{
        alignItems: "center"
    },
    forgotBody:{
        alignItems:"center",
        marginTop:25
    },
    loginView: {
        width: 200,
    },
    registrationStyle: {
        fontSize: 24,
        color: "white",
        backgroundColor: "#8181F7",
        margin: 10,
        padding: 8,
        borderRadius: 14,
        overflow: "hidden",
    },
    scannerMask : {
        borderWidth: 1,
        borderColor : "#FFFFFF",
        width: width/1.5,
        height: width/1.5
    },forgotScreen:{flex: 1,
        backgroundColor:"#ccffcf",
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'

    },
    forgotScreen2:{width:"70%",
        backgroundColor:"#ffffff",
        borderRadius:25,
        height:50,
        marginBottom:5,
        justifyContent:"center",
        padding:20}
    ,forgotMail:{

    }
    ,
    settingScreen:{
        flex: 1,
        backgroundColor:"#ccffcf",
        alignItems: 'center',
        justifyContent: 'center'
    }

});


