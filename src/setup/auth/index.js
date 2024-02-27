// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC48ZRL1niIKy2EIPw0aHKt05LfNlQ3cuk",
  authDomain: "twitter-clone-dd834.firebaseapp.com",
  projectId: "twitter-clone-dd834",
  storageBucket: "twitter-clone-dd834.appspot.com",
  messagingSenderId: "687682388810",
  appId: "1:687682388810:web:12080f1edc6678909e77b3",
  measurementId: "G-QJJF6JKHN6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);