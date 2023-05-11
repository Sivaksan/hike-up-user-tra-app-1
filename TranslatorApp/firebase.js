// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMkG2QSImmbgcVUZbuxsOCO5irxD_n2rE",
  authDomain: "hike-up-translator-app.firebaseapp.com",
  projectId: "hike-up-translator-app",
  storageBucket: "hike-up-translator-app.appspot.com",
  messagingSenderId: "547736455986",
  appId: "1:547736455986:web:615e9bec644279ad9b252b",
  measurementId: "G-85VNQNTDHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
// const db = getFirestore();

export { app, auth };
// const analytics = getAnalytics(app);