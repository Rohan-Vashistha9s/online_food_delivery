import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDidI9-OTv5ZdIHyQQeVSEA12vMBh3Rccs",
  authDomain: "food-delivery-55869.firebaseapp.com",
  projectId: "food-delivery-55869",
  storageBucket: "food-delivery-55869.appspot.com",
  messagingSenderId: "339723236346",
  appId: "1:339723236346:web:b9914b38fc53a3c29fea43",
  measurementId: "G-327JBW80FG"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };
