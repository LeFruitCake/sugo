// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw_wKY91QL3a5GUcwsXGnh1ixWfwnerLU",
  authDomain: "sugo-72f8c.firebaseapp.com",
  projectId: "sugo-72f8c",
  storageBucket: "sugo-72f8c.appspot.com",
  messagingSenderId: "812757346795",
  appId: "1:812757346795:web:fa02586fec9250e2bc51ae",
  measurementId: "G-SP050LXG97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app)
export const Storage = getStorage(app)