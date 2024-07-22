import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC6AtVb7hPaEwpTfs0Grf65Ef4Tg2w4ELc",
    authDomain: "quizy-b1cbf.firebaseapp.com",
    projectId: "quizy-b1cbf",
    storageBucket: "quizy-b1cbf.appspot.com",
    messagingSenderId: "860334105935",
    appId: "1:860334105935:web:8cb5ba8c38f1d536e7513a",
    measurementId: "G-ZC12RYP1FW"
  })

const db = firebaseApp.firestore()

const auth = firebase.auth();

export { db, auth}