// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiol_HgmIYoRi2EAlfPScBq5z2GFSPXJI",
  authDomain: "react-things-to-buy-app.firebaseapp.com",
  projectId: "react-things-to-buy-app",
  storageBucket: "react-things-to-buy-app.appspot.com",
  messagingSenderId: "895566413216",
  appId: "1:895566413216:web:ed876709b3681f32df78c5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Autenticación con firebase
export const FirebaseAuth = getAuth( FirebaseApp );

// Acceso a la base de datos
export const FirebaseDB = getFirestore(FirebaseApp);