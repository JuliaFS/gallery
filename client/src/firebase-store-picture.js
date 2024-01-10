// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8hb1jmZUlJdtNDrEaLPy--O3TxgChdBE",
  authDomain: "galeriq-guyndogan.firebaseapp.com",
  projectId: "galeriq-guyndogan",
  storageBucket: "galeriq-guyndogan.appspot.com",
  messagingSenderId: "428583105087",
  appId: "1:428583105087:web:7cec05c44b9d53983cbe8a",
  measurementId: "G-MWQ8H6D36T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);