// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adoption-61e0f.firebaseapp.com",
  projectId: "pet-adoption-61e0f",
  storageBucket: "pet-adoption-61e0f.firebasestorage.app",
  messagingSenderId: "806184759558",
  appId: "1:806184759558:web:0151c3b9e69a4f70646e87",
  measurementId: "G-SKGD84D0QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app);
//const analytics = getAnalytics(app);