import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBn-HXdCwAxePnognFZ9-4nWpNrJYYfCG8",
    authDomain: "weightexchangeapp.firebaseapp.com",
    databaseURL: "https://weightexchangeapp-default-rtdb.firebaseio.com",
    projectId: "weightexchangeapp",
    storageBucket: "weightexchangeapp.appspot.com",
    messagingSenderId: "1086264875488",
    appId: "1:1086264875488:web:758ac029a2426b092eb385",
    measurementId: "G-ZT4PY1KNGK"
  }
  
  const fire = firebase.initializeApp(firebaseConfig)

  // if firebase is not loaded initialize it
  //if(firebase.apps.length === 0) 
  //{
    //fire = firebase.initializeApp(firebaseConfig)
  //}

  export default fire;