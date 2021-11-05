import React from 'react';
import {Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './globalstyles';
import SignUp from './signup';

const Login = (props) => {
    const {
        setEmail,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        emailError,
        passwordError,
        hasAccountHandler,
        setForgotPassword,
        setFirstName,
        setLastName,
        setSex,
        setAge,
        setFeet,
        setInches,
        setWeight,
    } = props;

    function forgotPasswordHandler() {
        setForgotPassword(true);
    }

    return(

            <>
                {hasAccount ? (
                <>
                    <View style={styles.container}>
                        <Text style={styles.logo}>WeightExchange</Text>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email..."
                                placeholderTextColor="#003f5c"
                                onChangeText={setEmail}/>
                        </View>
                        <View style = {styles.errMsgBody}><Text style = {styles.errMsg}>{emailError}</Text></View>
                        <View style={styles.inputView} >
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                placeholder="Password..."
                                placeholderTextColor="#003f5c"
                                onChangeText={setPassword}/>
                        </View>
                        <View style = {styles.errMsgBody}><Text style = {styles.errMsg}>{passwordError}</Text></View>
                        <View style = {styles.loginView}>
                            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                        <View><Text>Don't have an account?</Text></View>
                        <View style={styles.switchToLoginOrRegister}>
                            <TouchableOpacity>
                                <Text style={styles.loginText} onPress={hasAccountHandler}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.forgotBody}>
                            <TouchableOpacity>
                                <Text style={styles.forgot} onPress = {forgotPasswordHandler}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
                ) : (
                        <SignUp
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleSignup={handleSignup}
                        emailError={emailError}
                        passwordError={passwordError}
                        hasAccountHandler={hasAccountHandler}
                        setFirstName = {setFirstName}
                        setLastName = {setLastName}
                        setSex = {setSex}
                        setAge = {setAge}
                        setFeet = {setFeet}
                        setInches = {setInches}
                        setWeight = {setWeight}/>

                )}
            </>
    )
}



export default Login;
