// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANf_ecqaIMHeCfElJgAgorGyIVgPByUf0",
  authDomain: "e-commerce-4f380.firebaseapp.com",
  databaseURL: "https://e-commerce-4f380-default-rtdb.firebaseio.com",
  projectId: "e-commerce-4f380",
  storageBucket: "e-commerce-4f380.appspot.com",
  messagingSenderId: "989951804284",
  appId: "1:989951804284:web:2b090c696b5e408bd0daf9",
  measurementId: "G-54XP8ZZT1C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);