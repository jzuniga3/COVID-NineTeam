import firebase from 'firebase';
// firebase code for app, able to call and send things to database with the fire import in other classes
var firebaseConfig = {
  apiKey: "AIzaSyDxRk9cR-Jyi3bkjt8Tn9yyesYW1H8x-o8",
  authDomain: "weightapp-85a36.firebaseapp.com",
  databaseURL: "https://weightapp-85a36-default-rtdb.firebaseio.com",
  projectId: "weightapp-85a36",
  storageBucket: "weightapp-85a36.appspot.com",
  messagingSenderId: "226771835324",
  appId: "1:226771835324:web:126b94e30d51156daa33b9"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;
