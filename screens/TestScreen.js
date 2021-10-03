import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TestScreen() {
    return (    
    <View style={styles.container}>
        <LinearGradient
          colors={[colors.lightBlue, colors.darkBlue]}
          style={styles.background}
        >
            
            <SafeAreaView>
                <View style={{ alignItems: 'center', paddingVertical: 34}}>
                    <Image 
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>Sign Up</Text>
                <AuthTextInput type="email" placeholder="example@gmail.com">Email</AuthTextInput>
                <AuthTextInput secureTextEntry={true}>Password</AuthTextInput>
                <AuthTextInput secureTextEntry={true}>Confirm Password</AuthTextInput>
                <View style={styles.footerText}>
                    <Text style={styles.textRegular}>Already Registered? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.textBold}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'flex-end', marginTop: 81}}>
                    <Button onPress={() => navigation.navigate("Login")} title="Create Account" color='#FFF'></Button>
                </View>
            </SafeAreaView>
        </LinearGradient>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
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
    button: {
        color: '#FFF'
    }
  });
  