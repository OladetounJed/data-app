/* 
  This is the Firebase SDK 
  configuration.

  Note: Firebase SDK was used instead
  of AXIOS, VUE-RESOURCE AND NATIVE FETCH
  due to the Google Cloud CORS Policy (ACCESS BLOCK)
   */

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOwGLLyRhFF-x6rXGCjpwcZweFIA5d15M",
  authDomain: "jed-test-app.firebaseapp.com",
  databaseURL: "https://jed-test-app.firebaseio.com",
  projectId: "jed-test-app",
  storageBucket: "jed-test-app.appspot.com",
  messagingSenderId: "352004957771",
  appId: "1:352004957771:web:8e984e3c2ca0b60bd80fce"
};

let app = firebase.initializeApp(firebaseConfig);
let db = app.database();

export default db;
