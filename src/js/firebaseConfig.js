// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw2_GaMIosmLN1DhnTXDTnHm1yCEUinks",
  authDomain: "impacteers-dms.firebaseapp.com",
  projectId: "impacteers-dms",
  storageBucket: "impacteers-dms.firebasestorage.app",
  messagingSenderId: "1036195727581",
  appId: "1:1036195727581:web:099af02c27bd8403f47334",
  measurementId: "G-7KNQZ4Q7J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const dbFirestore = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, dbFirestore, auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword };
