import React, { useState, useEffect } from 'react';
import fire from './components/fire';
import Login from './components/login';
import MainNavigation from './components/MainNavigation';
import ForgotPassword from './components/ForgotPassword';

export default function App() {
    //react hooks for objects
        const [user, setUser] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [emailError, setEmailError] = useState();
        const [passwordError, setPasswordError] = useState();
        const [hasAccount, setHasAccount] = useState(true);
        const [forgotPassword, setForgotPassword] = useState(false);

        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [sex, setSex] = useState("");
        const [age, setAge] = useState(-1);
        const [weight, setWeight] = useState(-1);
        const [feet, setFeet] = useState(-1);
        const [inches, setInches] = useState(-1);

        //clears any values prior to startup
        const clearInputs = () => {
            setEmail('');
            setPassword('');

        }
        //clears email and password errors prior to startup
        const clearErrors = () => {
            setEmailError('');
            setPasswordError('');
        }

        // login error handler for login function
        const handleLogin = () => {
            clearErrors();
            fire
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch((err) => {
                    switch(err.code){
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                        case "auth/user-not-found":
                            setEmailError(err.message);
                            break;
                        case "auth/wrong-password":
                            setPasswordError(err.message);
                            break;
                    }
                });
        };
    // signup error handler for signup function
        const handleSignup = () => {
            clearErrors();
            clearInputs();
            fire
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch((err) => {
                    switch(err.code){
                        case "auth/email-already-in-use":
                        case "auth/invalid-email":
                            setEmailError(err.message);
                            break;
                        case "auth/weak-password":
                            setPasswordError(err.message);
                            break;
                    }
                });
                fire
                .database()
                .ref('users/' + email.replace('.',','))
                .set({
                    firstName: firstName,
                    lastName: lastName,
                    sex: sex,
                    age: age,
                    weight: weight,
                    feet: feet,
                    inches: inches,
                    caloriesConsumed: 0,
            });
        };

        //triggers for transitions/response within the login page
        const authListener = () => {
            fire.auth().onAuthStateChanged( user => {
                if(user) {
                    clearInputs();
                    setUser(user);
                } else {
                    setUser("");
                }
            });
        };

        useEffect(() => {
            authListener();
        }, []);

        function hasAccountHandler() {
            setHasAccount(!hasAccount);
        }

    return (
        <>
        {forgotPassword ?(<><ForgotPassword/></>):(
            <>
            {user ? (
                <>
                    <MainNavigation/>
                </>
            ):(
                <>
                    <Login
                    email = {email}
                    setEmail = {setEmail}
                    password = {password}
                    setPassword = {setPassword}
                    handleLogin = {handleLogin}
                    handleSignup = {handleSignup}
                    hasAccount = {hasAccount}
                    setHasAccount = {setHasAccount}
                    emailError = {emailError}
                    passwordError = {passwordError}
                    hasAccountHandler = {hasAccountHandler}
                    setForgotPassword = {setForgotPassword}
                    setFirstName = {setFirstName}
                    setLastName = {setLastName}
                    setSex = {setSex}
                    setAge = {setAge}
                    setFeet = {setFeet}
                    setInches = {setInches}
                    setWeight = {setWeight}
                    />
                </>

            )}
            </>
            )}
        </>
    );
}
