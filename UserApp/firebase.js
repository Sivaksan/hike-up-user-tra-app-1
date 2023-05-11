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
    apiKey: "AIzaSyAPKQHhbN8DDtlzc_P0oEdiPwumfh5Ljd0",
    authDomain: "hike-up-user-app.firebaseapp.com",
    projectId: "hike-up-user-app",
    storageBucket: "hike-up-user-app.appspot.com",
    messagingSenderId: "689765302228",
    appId: "1:689765302228:web:22afc6bf9b481b864a6041",
    measurementId: "G-Z9YXQFTGCD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
// const db = getFirestore();

export { auth };
// const analytics = getAnalytics(app);