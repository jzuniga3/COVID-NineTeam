import {Text, View} from "react-native";
import React, {useState,useEffect}from "react";
import fire from "./fire";
import styles from './globalstyles.js';



export default function ProfileScreen() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState(-1);
    const [weight, setWeight] = useState(-1);
    const [feet, setFeet] = useState(-1);
    const [inches, setInches] = useState(-1);

    function userPull() {
        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/firstName").on('value',(snapshot => {
            const data = snapshot.val();
            setFirstName(data);
        }))


        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/lastName").on('value',(snapshot => {
            const data = snapshot.val();
            setLastName(data);
        }))


        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/sex").on('value',(snapshot => {
            const data = snapshot.val();
            setSex(data);
        }))


        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/age").on('value',(snapshot => {
            const data = snapshot.val();
            setAge(data);
        }))


        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/weight").on('value',(snapshot => {
            const data = snapshot.val();
            setWeight(data);
        }))


        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/feet").on('value',(snapshot => {
            const data = snapshot.val();
            setFeet(data);
        }))


        fire.database().ref('users/' + fire.auth().currentUser.email.replace('.',',') + "/inches").on('value',(snapshot => {
            const data = snapshot.val();
            setInches(data);
        }))
    }

    useEffect(userPull);
    let totalHeight = (feet*12) + inches*1;
    // const BMR = () => {if(sex == "male"){
    //     return 66+(6.3*weight)+(12.9*totalHeight)-(6.8*age)
    //
    // }else{
    //         return 655+(4.3*weight)+(4.7*totalHeight)-(4.7*age)
    // };}
    const BMI = (weight/(totalHeight*totalHeight)*703).toFixed(2);

    return (
        <View style={styles.container}>

            <Text>
                First Name: {firstName} {"\n"}
                Last Name: {lastName} {"\n"}
                Sex: {sex} {"\n"}
                Age: {age} {"\n"}
                Weight:{weight}{"\n"}
                Height:{feet}'{inches}"{"\n"}
                BMI:{BMI} {"\n"}
                {/*Base Calorie Expense:{BMR}*/}
            </Text>


        </View>
    );
}
