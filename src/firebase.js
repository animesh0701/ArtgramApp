import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUCJ0wMP35Kt9kkEeXk6DgfjYDsC-AQ6Q",
  authDomain: "reactartgram.firebaseapp.com",
  projectId: "reactartgram",
  storageBucket: "reactartgram.appspot.com",
  messagingSenderId: "954925980587",
  appId: "1:954925980587:web:b9f11c8946bf7e70c8d0ee",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
