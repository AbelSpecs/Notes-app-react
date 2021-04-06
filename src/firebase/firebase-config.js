import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDofhQZFywa5sv87IJy95HWr8fYrpxSAK4",
    authDomain: "react-app-9a25f.firebaseapp.com",
    projectId: "react-app-9a25f",
    storageBucket: "react-app-9a25f.appspot.com",
    messagingSenderId: "3423636780",
    appId: "1:3423636780:web:73078a80d876514b49f089",
    measurementId: "G-N7LPZFQHBP"
  };

firebase.initializeApp(firebaseConfig); 

const db = firebase.firestore();
const gooogleAuthProvider = new firebase.auth.GoogleAuthProvider();
/* const emailAuthProvider = new firebase.auth.EmailAuthProvider(); */


export {
    db,
    gooogleAuthProvider,
    firebase
}