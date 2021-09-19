import firebase from 'firebase';
// firebase code for app, able to call and send things to database with the fire import in other classes
var firebaseConfig = {
  apiKey: "AIzaSyBn-HXdCwAxePnognFZ9-4nWpNrJYYfCG8",
  authDomain: "weightexchangeapp.firebaseapp.com",
  databaseURL: "https://weightexchangeapp-default-rtdb.firebaseio.com",
  projectId: "weightexchangeapp",
  storageBucket: "weightexchangeapp.appspot.com",
  messagingSenderId: "1086264875488",
  appId: "1:1086264875488:web:758ac029a2426b092eb385",
  measurementId: "G-ZT4PY1KNGK"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;
