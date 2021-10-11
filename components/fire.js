import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA7rgIT_5KypkwHEUWdU78ewTiy7tvgvCQ",
    authDomain: "weightexchangeapplication.firebaseapp.com",
    databaseURL: "https://weightexchangeapplication.firebaseio.com",
    projectId: "weightexchangeapplication",
    storageBucket: "weightexchangeapplication.appspot.com",
    messagingSenderId: "42660337059",
    appId: "1:42660337059:web:eb1ede6124d6dc4431f616",
    measurementId: "G-DMRH6L0BB3"
  }
  
  const fire = firebase.initializeApp(firebaseConfig)

  // if firebase is not loaded initialize it
  //if(firebase.apps.length === 0) 
  //{
    //fire = firebase.initializeApp(firebaseConfig)
  //}

  export default fire;