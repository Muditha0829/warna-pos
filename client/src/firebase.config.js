import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFgWjMXoHC4UXurgmntwSEO4B77lRbeYk",
  authDomain: "warna-pos.firebaseapp.com",
  projectId: "warna-pos",
  storageBucket: "warna-pos.appspot.com",
  messagingSenderId: "32873436096",
  appId: "1:32873436096:web:e63e022c7ad82773d3ee25"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };
