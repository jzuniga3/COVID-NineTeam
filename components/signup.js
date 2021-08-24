import React, {useState} from "react";
import RNPickerSelect from 'react-native-picker-select';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import styles from './globalstyles';

const SignUp =(props)=>{
    const {
        setEmail,
        setPassword,
        handleSignup,
        emailError,
        passwordError,
        hasAccountHandler,
        setFirstName,
        setLastName,
        setSex,
        setAge,
        setFeet,
        setInches,
        setWeight,
    } = props;

    return (

      <View style={styles.container}>

        <Text style={styles.registrationStyle}>
          Registration
        </Text>

        <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#BDBDBD"
          onChangeText={setEmail}
        />
        </View>

        <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="#BDBDBD"
          onChangeText={setPassword}
        />
        </View>

        <View style={styles.inputView}>
            <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            placeholderTextColor="#BDBDBD"
            onChangeText={setFirstName}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            placeholder="Last Name"
            autoCapitalize="none"
            placeholderTextColor="#BDBDBD"
            onChangeText={setLastName}
            />
        </View>

        <View style={{height:40, width:"70%", backgroundColor: 'white', padding:10, marginBottom:15, borderColor:'black', borderWidth:2}}>
            <RNPickerSelect
                onValueChange={setSex}
                placeholder={{label:'Select your sex...', value: null, color: 'blue'}}
                items ={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                ]}/>
        </View>

        {/*
        <View style={styles.inputView}>
            <TextInput
            placeholder="Gender"
            autoCapitalize="none"
            placeholderTextColor="#BDBDBD"
            onChangeText={val => this.onChangeText("gender", val)}
            />
        </View>
        */}
        <View style={styles.inputView}>
            <TextInput
            placeholder="Age"
            autoCapitalize="none"
            placeholderTextColor="#BDBDBD"
            onChangeText={setAge}


            />
        </View>

        <View style={{flexDirection:"row", alignItems:'left'}}>
            <View style={{width:'40%',
            backgroundColor:"#ffffff",
            borderRadius:25,
            height:60,
            marginBottom:20,
            justifyContent:"center",
            padding:20}}>
                <TextInput
                placeholder="feet"
                autoCapitalize="none"
                placeholderTextColor="#BDBDBD"
                onChangeText={setFeet}
                />
            </View>
            <View style={{width:'40%',
            backgroundColor:"#ffffff",
            borderRadius:25,
            height:60,
            marginBottom:20,
            justifyContent:"center",
            padding:20}}>
                <TextInput
                placeholder="inches"
                autoCapitalize="none"
                placeholderTextColor="#BDBDBD"
                onChangeText={setInches}
                />
            </View>
        </View>
        <View style={styles.inputView}>
            <TextInput
            placeholder="Weight"
            autoCapitalize="none"
            placeholderTextColor="#BDBDBD"
            onChangeText={setWeight}


            />
        </View>

        <TouchableOpacity onPress = {handleSignup}><Text style={styles.registrationStyle}>Sign Up</Text></TouchableOpacity>
        <View style = {{padding:20}}><TouchableOpacity onPress = {hasAccountHandler}><Text>Return to Log In</Text></TouchableOpacity></View>


      </View>
    );
}

export default SignUp;
