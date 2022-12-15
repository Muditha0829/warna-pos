import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-gToUEeR4Y5E2l3L8_k_qmWms4lIBE3U",
  authDomain: "busticketingsystem-53c45.firebaseapp.com",
  projectId: "busticketingsystem-53c45",
  storageBucket: "busticketingsystem-53c45.appspot.com",
  messagingSenderId: "439298272309",
  appId: "1:439298272309:web:9c35f6571d3eb378e5157c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };
